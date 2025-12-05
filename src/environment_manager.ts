import fs from 'fs';
import path from 'path';
import type {
  AugmentedEnvironmentManager,
  CreateEnvSchemaOptions,
  EnvParsedFileType,
  SchemaBuilderType,
} from './environment_manager_types';
import { validateEnvs } from './evitron';
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
  readonly schemaDefinition: T;
  readonly rootPath: string;
  readonly logs: boolean;
  readonly throwErrorOnValidationFail: boolean;
  readonly envFile: string | string[];
  envs: EnvParsedFileType;

  constructor(
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
   * @description - This function is used to get a value from the environment variables from the schema
   * @description - If the value is not found, it will return the default value if provided
   * @warning - If the value is not found and no default value is provided, it will return empty string to mimic the behavior of process.env since provided envs are always present even if they are not set
   */
  get<K extends keyof T>(key: K): InferEnvCallbackType<T[K]>;
  get<K extends keyof T, D extends InferEnvCallbackType<T[K]>>(
    key: K,
    defaultValue: D
  ): NonNullable<InferEnvCallbackType<T[K]>>;
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

  collectEnvs(): EnvParsedFileType {
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
}
