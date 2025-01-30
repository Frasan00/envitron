import fs from 'fs';
import path from 'path';
import logger, { log } from './logger';
import {
  CreateEnvSchemaOptions,
  envFileNames,
  EnvParsedFileType,
  SchemaBuilderType,
  SchemaTypes,
} from './environment_manager_constants';
import { z } from 'zod';

export default class EnvironmentManager<T extends Record<string, SchemaTypes>> {
  private schema: z.ZodObject<T>;
  private rootPath: string;
  private envs: EnvParsedFileType;
  private logs: boolean;
  private throwErrorOnValidationFail: boolean;
  private envFileHierarchy: envFileNames[];

  private constructor(
    schemaBuilder: (schema: typeof z) => z.ZodObject<T>,
    options?: {
      logs?: boolean;
      rootPath?: string;
      throwErrorOnValidationFail?: boolean;
      envFileHierarchy?: envFileNames[];
    }
  ) {
    this.rootPath = path.resolve(process.cwd(), options?.rootPath || '');
    this.logs = options?.logs ?? true;
    this.throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    this.envFileHierarchy = options?.envFileHierarchy || ['.env'];
    this.envs = this.collectEnvs();
    this.schema = schemaBuilder(z);
  }

  /**
   * @description - This function is used to create the schema for the environment variables
   * @param cb - A callback function that returns the schema for the environment variables
   * @param options - An object that contains the options for the environment manager
   */
  static createEnvSchema<T extends Record<string, SchemaTypes>>(
    options?: CreateEnvSchemaOptions
  ): EnvironmentManager<T>;
  static createEnvSchema<T extends Record<string, SchemaTypes>>(
    schemaBuilder: SchemaBuilderType<T>,
    options?: CreateEnvSchemaOptions
  ): EnvironmentManager<T>;
  static createEnvSchema<T extends Record<string, SchemaTypes>>(
    schemaBuilderOrOptions?: SchemaBuilderType<T> | CreateEnvSchemaOptions,
    options?: CreateEnvSchemaOptions
  ): EnvironmentManager<T> {
    if (!(typeof schemaBuilderOrOptions === 'function')) {
      return EnvironmentManager.getStandaloneInstance<T>(schemaBuilderOrOptions);
    }

    const envFileHierarchy = options?.envFileHierarchy || ['.env'];
    const logs = options?.logs ?? true;
    const throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    const rootPath = path.resolve(process.cwd(), options?.rootPath || '');
    const envManagerInstance = new EnvironmentManager(schemaBuilderOrOptions, {
      logs,
      rootPath,
      throwErrorOnValidationFail,
      envFileHierarchy,
    });

    envManagerInstance.envs = envManagerInstance.collectEnvs();
    try {
      envManagerInstance.schema.parse(envManagerInstance.envs);
    } catch (error: any) {
      if (envManagerInstance.throwErrorOnValidationFail) {
        throw error;
      }

      if (envManagerInstance.logs) {
        logger.error(error);
      }
    }

    if (options?.loadProcessEnv) {
      process.env = {
        ...process.env,
        ...Object.keys(envManagerInstance.envs).reduce(
          (acc, key) => {
            acc[key] = envManagerInstance.envs[key]?.toString() as string;
            return acc;
          },
          {} as Record<string, string>
        ),
      };
    }

    return envManagerInstance;
  }

  /**
   * @description - This function is used to get a value from the environment variables from the schema
   */
  get<K extends keyof z.infer<z.ZodObject<T>>>(
    key: K,
    defaultValue?: any
  ): z.infer<z.ZodObject<T>>[K];
  get(key: string, defaultValue?: any): any;
  get<K extends keyof z.infer<z.ZodObject<T>>>(
    key: K,
    defaultValue?: any
  ): z.infer<z.ZodObject<T>>[K] {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }

    const value = this.envs[key as string];
    if (value === undefined) {
      const schemaDefaultValue =
        this.schema.shape[key as string]?._def.defaultValue?.() ?? undefined;
      return defaultValue ?? schemaDefaultValue;
    }

    const retrievedEnv = this.schema.shape[key as string];
    if (!retrievedEnv) {
      return value as any;
    }

    return retrievedEnv.parse(value);
  }

  /**
   * @returns - Returns all the environment variables part of the schema
   */
  getAll(): z.infer<z.ZodObject<T>> & { [key: string]: any } {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }

    return this.envs as z.infer<z.ZodObject<T>> & { [key: string]: any };
  }

  private collectEnvs(): EnvParsedFileType {
    const envFileHierarchy = this.envFileHierarchy;
    if (typeof envFileHierarchy === 'string') {
      const envPath = `${this.rootPath}/${envFileHierarchy}`;
      if (!fs.existsSync(envPath) && !this.throwErrorOnValidationFail) {
        log(`Environment file not found: ${envPath}`, this.logs);
        return {};
      }

      if (!fs.existsSync(envPath)) {
        throw new Error(`Environment file not found: ${envPath}`);
      }

      return this.parseEnvFile(envPath);
    }

    for (const envFile of envFileHierarchy) {
      const envPath = `${this.rootPath}/${envFile}`;
      if (!fs.existsSync(envPath)) {
        log(`Environment file not found: ${envPath}`, this.logs);
        log(`Trying next environment file...`, this.logs);
        continue;
      }

      return this.parseEnvFile(envPath);
    }

    if (this.throwErrorOnValidationFail) {
      throw new Error('Environment file not found');
    }

    log('No environment file in the hierarchy list found', this.logs);
    return {};
  }

  private parseEnvFile(envPath: string): EnvParsedFileType {
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envs = envFile.split('\n');
    const envsObject: EnvParsedFileType = {};
    const regex = /^(\S+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\[.*\]|\{.*\}|\S+))/;

    for (const env of envs) {
      const match = env.match(regex);
      if (!match) {
        continue;
      }

      const key = match[1];
      let value: string | boolean | any[] = match[2] || match[3] || match[4];
      if (value && value.trim().startsWith('#')) {
        continue;
      }

      // Handle "" or ''
      if (value === undefined) {
        value = '';
      }

      // Handle array values
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map((v) => v.trim().replace(/^["']|["']$/g, ''));
      }

      // Handle object values
      if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          console.error(`Failed to parse JSON in the environment file for key ${key}: ${value}`);
        }
      }

      // handle boolean values
      if (value === 'true' || value === 'false') {
        value = Boolean(value);
      }

      envsObject[key] = value;
    }

    return envsObject;
  }

  /**
   * @description - Used for schema-less environment variable retrieval
   */
  private static getStandaloneInstance<T extends Record<string, SchemaTypes>>(
    options?: CreateEnvSchemaOptions
  ): EnvironmentManager<T> {
    const envFileHierarchy = options?.envFileHierarchy || ['.env'];
    const logs = options?.logs ?? true;
    const throwErrorOnValidationFail = false;
    const rootPath = path.resolve(process.cwd(), options?.rootPath || '');
    const envManagerInstance = new EnvironmentManager(() => z.object({}) as any, {
      logs,
      rootPath,
      throwErrorOnValidationFail,
      envFileHierarchy,
    });

    const envs = envManagerInstance.collectEnvs();
    envManagerInstance.envs = envs;

    if (options?.loadProcessEnv) {
      process.env = {
        ...process.env,
        ...Object.keys(envs).reduce(
          (acc, key) => {
            acc[key] = envs[key]?.toString() as string;
            return acc;
          },
          {} as Record<string, string>
        ),
      };
    }

    return envManagerInstance as EnvironmentManager<T>;
  }
}
