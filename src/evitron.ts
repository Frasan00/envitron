import path from 'path';
import EnvironmentManager from './environment_manager';
import type {
  AugmentedEnvironmentManager,
  CreateEnvSchemaOptions,
  EnvParsedFileType,
  SchemaBuilderType,
} from './environment_manager_types';
import { MissingRequiredEnvError, WrongTypeError } from './envitron_error';
import logger, { log } from './logger';
import type {
  EnvironmentSchemaTypes,
  EnvValidationCallback,
  InferEnvCallbackType,
  InferType,
} from './schema/schema_types';

function getStandaloneInstance<T extends Record<string, EnvironmentSchemaTypes>>(
  options?: CreateEnvSchemaOptions
): EnvironmentManager<T> {
  const envManagerInstance = new EnvironmentManager(() => ({}), {
    ...options,
    envFile: options?.envFile || '.env',
  });

  if (options?.loadFromProcessEnv ?? true) {
    envManagerInstance.envs = {
      ...envManagerInstance.envs,
      ...Object.entries(process.env).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as EnvParsedFileType),
    };
  }

  return envManagerInstance as EnvironmentManager<T>;
}

export function validateEnvs<
  T extends Record<string, EnvValidationCallback<EnvironmentSchemaTypes>>,
>(envManagerInstance: EnvironmentManager<T>): void {
  for (const schemaKey in envManagerInstance.schemaDefinition) {
    const envValue = envManagerInstance.envs[schemaKey] as string;
    const envParser = envManagerInstance.schemaDefinition[schemaKey];
    const res = envParser(envValue);
    if (!envManagerInstance.throwErrorOnValidationFail) {
      if (res.error?.type === 'required_and_missing') {
        log(new MissingRequiredEnvError(schemaKey).message, envManagerInstance.logs);
      }

      if (res.error?.type === 'wrong_type') {
        log(
          new WrongTypeError(schemaKey, envValue, res.error.expectedType, res.error.foundType!)
            .message,
          envManagerInstance.logs
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

    envManagerInstance.envs[schemaKey] = res.value as string;
  }
}

export function createEnvSchema<T extends Record<string, EnvironmentSchemaTypes>>(
  options?: CreateEnvSchemaOptions
): AugmentedEnvironmentManager<T>;
export function createEnvSchema<T extends Record<string, EnvironmentSchemaTypes>>(
  schemaBuilder: SchemaBuilderType<T>,
  options?: CreateEnvSchemaOptions
): AugmentedEnvironmentManager<T>;
export function createEnvSchema<T extends Record<string, EnvironmentSchemaTypes>>(
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
    return getStandaloneInstance<T>({
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
    validateEnvs(envManagerInstance);
  } catch (error: any) {
    if (envManagerInstance.throwErrorOnValidationFail) {
      throw error;
    }

    if (envManagerInstance.logs) {
      logger.logError(error);
    }
  }

  if (options?.loadFromProcessEnv ?? true) {
    envManagerInstance.envs = {
      ...envManagerInstance.envs,
      ...Object.entries(process.env).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as EnvParsedFileType),
    };
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
