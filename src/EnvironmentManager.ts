import fs from 'fs';
import path from 'path';
import { log } from './Logger';
import vine from '@vinejs/vine';
import { SchemaTypes } from '@vinejs/vine/build/src/types';
import { InferSchemaType, ReturnTypeObject, envFileNames } from './EnvironmentManagerConstants';

export default class EnvironmentManager<T extends Record<string, SchemaTypes>> {
  public schema: ReturnTypeObject<T>;
  private rootPath: string;
  private envs: Record<string, string | boolean | number | undefined>;
  private logs: boolean;
  private throwErrorOnValidationFail: boolean;
  private envFileHierarchy: envFileNames[];

  private constructor(
    schemaBuilder: (vineInstance: typeof vine) => ReturnTypeObject<T>,
    options?: {
      logs?: boolean;
      rootPath?: string;
      throwErrorOnValidationFail?: boolean;
      envFileHierarchy?: envFileNames[];
    }
  ) {
    this.rootPath = options?.rootPath || path.resolve(__dirname);
    this.logs = options?.logs ?? true;
    this.throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    this.envFileHierarchy = options?.envFileHierarchy || ['.env'];
    this.envs = this.collectEnvs();
    this.schema = schemaBuilder(vine);
  }

  /**
   *
   * @returns - Returns all the environment variables
   */
  public getAll(): Record<string, string | number | boolean | undefined> {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }

    return this.envs;
  }

  /**
   * @description - Used for schema-less environment variable retrieval
   */
  public static getInstance<T extends Record<string, SchemaTypes>>(options?: {
    logs?: boolean;
    rootPath?: string;
    envFileHierarchy?: envFileNames[];
  }): EnvironmentManager<T> {
    const envFileHierarchy = options?.envFileHierarchy || ['.env'];
    const logs = options?.logs ?? true;
    const throwErrorOnValidationFail = false;
    const rootPath = options?.rootPath || path.resolve(__dirname);
    const envManagerInstance = new EnvironmentManager(() => vine.object({}), {
      logs,
      rootPath,
      throwErrorOnValidationFail,
      envFileHierarchy,
    });
    envManagerInstance.envs = envManagerInstance.collectEnvs();
    return envManagerInstance as EnvironmentManager<T>;
  }

  /**
   * @description - This function is used to create the schema for the environment variables
   * @param cb - A callback function that returns the schema for the environment variables
   * @param options - An object that contains the options for the environment manager
   */
  public static async createEnvSchema<T extends Record<string, SchemaTypes>>(
    schemaBuilder: (vineInstance: typeof vine) => ReturnTypeObject<T>,
    options?: {
      logs?: boolean;
      rootPath?: string;
      throwErrorOnValidationFail?: boolean;
      envFileHierarchy?: envFileNames[];
    }
  ): Promise<EnvironmentManager<T>> {
    const envFileHierarchy = options?.envFileHierarchy || ['.env'];
    const logs = options?.logs ?? true;
    const throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    const rootPath = path.resolve(process.cwd(), options?.rootPath || '');
    const envManagerInstance = new EnvironmentManager(schemaBuilder, {
      logs,
      rootPath,
      throwErrorOnValidationFail,
      envFileHierarchy,
    });
    envManagerInstance.envs = envManagerInstance.collectEnvs();
    envManagerInstance.schema = schemaBuilder(vine);
    try {
      await vine.validate({
        schema: envManagerInstance.schema,
        data: envManagerInstance.envs,
      });
    } catch (error: any) {
      if (envManagerInstance.throwErrorOnValidationFail) {
        throw error;
      }

      console.error(error);
    }

    return envManagerInstance;
  }

  /**
   * @description - This function is used to get a raw value from the environment variables outside the schema
   * @param key
   * @param defaultValue
   * @returns
   */
  public getRaw(key: string, defaultValue?: any): string | number | boolean | undefined {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }

    return this.envs[key] || defaultValue;
  }

  /**
   * @description - This function is used to get a value from the environment variables from the schema
   * @description - In order to retrieve an outside schema value, use the getRaw function
   * @param key
   * @param defaultValue
   * @returns
   */
  public get<K extends keyof T>(
    key: K,
    defaultValue?: any,
    schema: ReturnTypeObject<T> = this.schema
  ): InferSchemaType<T, K> {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }

    const value = this.envs[key as string];
    if (value === undefined) {
      return defaultValue;
    }

    // @ts-ignore
    const retrievedEnv = schema[key as string];
    if (!retrievedEnv) {
      return value as any;
    }

    return retrievedEnv.parse(value);
  }

  protected collectEnvs(): Record<string, string | number | boolean> {
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

  protected parseEnvFile(envPath: string): Record<string, string | number | boolean> {
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envs = envFile.split('\n');
    const envsObject: Record<string, number | string | boolean> = {};
    const regex = /^(\S+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/;

    for (const env of envs) {
      if (env.trim().startsWith('#')) {
        continue;
      }

      const match = env.match(regex);
      if (match) {
        const key = match[1];
        const value = match[2] || match[3] || match[4];
        if (value) {
          envsObject[key] = value;
        }
      }
    }

    return envsObject;
  }
}
