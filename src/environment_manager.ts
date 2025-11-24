import fs from 'fs';
import path from 'path';
import type {
  AugmentedEnvironmentManager,
  CreateEnvSchemaOptions,
  EnvParsedFileType,
  SchemaBuilderType,
} from './environment_manager_types';
import { MissingRequiredEnvError, WrongTypeError } from './envitron_error';
import logger, { log } from './logger';
import { Schema } from './schema/schema';
import type {
  EnvironmentSchemaTypes,
  EnvValidationCallback,
  InferEnvCallbackType,
  InferType,
} from './schema/schema_types';

export default class EnvironmentManager<
  T extends Record<string, EnvValidationCallback<EnvironmentSchemaTypes>>,
> {
  private schemaDefinition: T;
  private rootPath: string;
  private envs: EnvParsedFileType;
  private logs: boolean;
  private throwErrorOnValidationFail: boolean;
  private envFile: string | string[];

  private constructor(
    schemaBuilder: (schema: Schema) => T,
    options?: {
      logs?: boolean;
      rootPath?: string;
      throwErrorOnValidationFail?: boolean;
      envFile: string | string[];
    }
  ) {
    this.rootPath = path.resolve(process.cwd(), options?.rootPath || '');
    this.logs = options?.logs ?? true;
    this.throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    this.envFile = options?.envFile || ['.env'];
    this.envs = this.collectEnvs();
    this.schemaDefinition = schemaBuilder(new Schema());
  }

  /**
   * @description - This function is used to create the schema for the environment variables
   * @description - Automatically loads the environment variables and parses them using the schema
   * @param cb - A callback function that returns the schema for the environment variables
   * @param options - An object that contains the options for the environment manager
   */
  static createEnvSchema<T extends Record<string, EnvironmentSchemaTypes>>(
    options?: CreateEnvSchemaOptions
  ): AugmentedEnvironmentManager<T>;
  static createEnvSchema<T extends Record<string, EnvironmentSchemaTypes>>(
    schemaBuilder: SchemaBuilderType<T>,
    options?: CreateEnvSchemaOptions
  ): AugmentedEnvironmentManager<T>;
  static createEnvSchema<T extends Record<string, EnvironmentSchemaTypes>>(
    schemaBuilderOrOptions?: SchemaBuilderType<T> | CreateEnvSchemaOptions,
    options?: CreateEnvSchemaOptions
  ): AugmentedEnvironmentManager<T> {
    if (!(typeof schemaBuilderOrOptions === 'function')) {
      options = schemaBuilderOrOptions;
    }

    const envFile = options?.envFile || '.env';
    const logs = options?.logs ?? true;
    const throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    const rootPath = path.resolve(process.cwd(), options?.rootPath || '');
    if (!(typeof schemaBuilderOrOptions === 'function')) {
      return EnvironmentManager.getStandaloneInstance<T>({
        ...schemaBuilderOrOptions,
        envFile,
        logs,
        throwErrorOnValidationFail,
        rootPath,
      }) as AugmentedEnvironmentManager<T>;
    }

    const envManagerInstance = new EnvironmentManager(schemaBuilderOrOptions, {
      ...options,
      logs,
      rootPath,
      throwErrorOnValidationFail,
      envFile,
    });

    envManagerInstance.envs = envManagerInstance.collectEnvs();
    try {
      envManagerInstance.validateEnvs();
    } catch (error: any) {
      if (envManagerInstance.throwErrorOnValidationFail) {
        throw error;
      }

      if (envManagerInstance.logs) {
        logger.logError(error);
      }
    }

    if (options?.loadFromProcessEnv) {
      Object.entries(envManagerInstance.envs).forEach(([key, value]) => {
        envManagerInstance.envs[key] = value;
      });
    }

    return Object.keys(envManagerInstance.envs).reduce(
      (acc, key) => {
        acc[key as keyof T] = envManagerInstance.get(key) as InferEnvCallbackType<
          T[keyof T]
        > as InferType<T[keyof T]>;
        return acc;
      },
      envManagerInstance as { [K in keyof T]: InferEnvCallbackType<T[K]> } & { [key: string]: any }
    ) as AugmentedEnvironmentManager<T>;
  }

  /**
   * @description - This function is used to get a value from the environment variables from the schema
   * @description - If the value is not found, it will return the default value if provided
   * @warning - If the value is not found and no default value is provided, it will return empty string to mimic the behavior of process.env since provided envs are always present even if they are not set
   */
  get<K extends keyof T>(key: K): InferEnvCallbackType<T[K]>;
  get<K extends keyof T>(
    key: K,
    defaultValue: InferEnvCallbackType<T[K]>
  ): InferEnvCallbackType<T[K]>;
  get(key: string): string | undefined;
  get(key: string, defaultValue: string): string;
  get<K extends keyof T>(key: K | string, defaultValue?: any): any {
    const value = this.envs[key as string];
    // By default, we return undefined if the value is empty string
    const parsedValue = value === '' ? undefined : value;
    return parsedValue ?? defaultValue;
  }

  /**
   * @description - This function is used to set a value in the environment variables
   */
  set<K extends keyof T>(key: K, value: T[K]): void;
  set(key: string, value: any): void;
  set<K extends keyof T>(key: K | string, value: T[K] | any): void {
    this.envs[key as string] = value;
  }

  /**
   * @returns - Returns all the environment variables part of the schema parsed
   */
  all(): { [K in keyof T]: InferEnvCallbackType<T[K]> } & { [key: string]: any } {
    return Object.keys(this.envs).reduce(
      (acc, key) => {
        acc[key as keyof T] = this.get(key) as InferEnvCallbackType<T[keyof T]>;
        return acc;
      },
      {} as { [K in keyof T]: InferEnvCallbackType<T[K]> } & { [key: string]: any }
    );
  }

  protected collectEnvs(): EnvParsedFileType {
    if (typeof this.envFile === 'string') {
      const envPath = path.join(this.rootPath, this.envFile);
      if (!fs.existsSync(envPath)) {
        log(`[Envitron] Environment file not found: ${envPath}`, this.logs);
        return {};
      }

      return this.parseEnvFile(envPath);
    }

    if (Array.isArray(this.envFile)) {
      const mergedEnvs: EnvParsedFileType = {};
      for (const envFile of this.envFile) {
        const envPath = path.resolve(this.rootPath, envFile);
        if (!fs.existsSync(envPath)) {
          log(`[Envitron] Environment file not found: ${envPath}`, this.logs);
          continue;
        }

        const parsed = this.parseEnvFile(envPath);
        Object.assign(mergedEnvs, parsed);
      }

      return mergedEnvs;
    }

    log('[Envitron] No environment provided', this.logs);
    return {};
  }

  private validateEnvs(): void {
    for (const schemaKey in this.schemaDefinition) {
      const envValue = this.envs[schemaKey] as string;
      const envParser = this.schemaDefinition[schemaKey];
      const res = envParser(envValue);
      if (!this.throwErrorOnValidationFail) {
        if (res.error?.type === 'required_and_missing') {
          log(new MissingRequiredEnvError(schemaKey).message, this.logs);
        }

        if (res.error?.type === 'wrong_type') {
          log(
            new WrongTypeError(schemaKey, envValue, res.error.expectedType, res.error.foundType!)
              .message,
            this.logs
          );
        }

        continue;
      }

      if (res.error?.type === 'required_and_missing') {
        throw new MissingRequiredEnvError(schemaKey);
      }

      if (res.error?.type === 'wrong_type') {
        throw new WrongTypeError(schemaKey, envValue, res.error.expectedType, res.error.foundType!);
      }

      this.envs[schemaKey] = res.value as string;
    }
  }

  /**
   * @description - This function is used to parse the environment file, it will return an object with the environment variables
   */
  parseEnvFile(envPath: string): EnvParsedFileType {
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envsObject: EnvParsedFileType = {};

    const regex =
      /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(envFile)) !== null) {
      const key = match[1];
      let value = match[2]?.trim() || '';

      // Remove surrounding quotes if any
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('`') && value.endsWith('`'))
      ) {
        const quoteType = value[0];
        value = value.slice(1, -1);

        // Handle escape sequences only if double-quoted
        if (quoteType === '"') {
          value = value
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\');
        }
      }

      if (value.includes(',')) {
        envsObject[key] = value
          .split(',')
          .map((v) => v.trim())
          .join(',');
      } else {
        envsObject[key] = value;
      }
    }

    return envsObject;
  }

  /**
   * @description - Used for schema-less environment variable retrieval
   */
  private static getStandaloneInstance<T extends Record<string, EnvironmentSchemaTypes>>(
    options?: CreateEnvSchemaOptions
  ): EnvironmentManager<T> {
    const envManagerInstance = new EnvironmentManager(() => ({}), {
      ...options,
      envFile: options?.envFile || '.env',
    });

    if (options?.loadFromProcessEnv) {
      Object.entries(process.env).forEach(([key, value]) => {
        envManagerInstance.envs[key] = value;
      });
    }

    return envManagerInstance as EnvironmentManager<T>;
  }
}
