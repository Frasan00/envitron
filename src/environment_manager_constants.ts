import { Schema } from './schema/schema';
import { EnvironmentSchemaTypes } from './schema/schema_types';

/**
 * @description - An object that contains the parsed environment variables
 */
export type EnvParsedFileType = Record<string, string | undefined>;

/**
 * @description - An object that contains the options for the environment manager
 */
export type CreateEnvSchemaOptions = {
  /**
   * @description - A boolean that determines if the logs should be shown, only used in validation when throwErrorOnValidationFail is false - defaults to false
   */
  logs?: boolean;

  /**
   * @description - The root path for the environment manager where the environment files are located - defaults to the current working directory
   * @warning - The root path will still be resolved from the current working directory
   */
  rootPath?: string;

  /**
   * @description - A boolean that determines if an error should be thrown when the validation fails, true by default
   */
  throwErrorOnValidationFail?: boolean;

  /**
   * @description - A string, array of strings, or regex that contains details about the environment files to load
   * @example - '.env'
   * @example - ['.env', 'src/users/.env.users'] - can be used to load multiple environment files from different directories
   */
  envFile?: string | string[];

  /**
   * @description - A boolean that determines if the process.env should be loaded into the environment manager - defaults to false
   * @description Fills from the environment variables that are already set in the process.env object
   * @example - export NOVALUE=123 && node index.js
   * ```ts
   * const env = createEnvSchema((schema) => {
   *   return {
   *     NOVALUE: schema.string(),
   *   };
   * }, { loadFromProcessEnv: true });
   *
   * console.log(env.get('NOVALUE')); // 123
   * ```
   */
  loadFromProcessEnv?: boolean;
};

/**
 * @description - A function that returns the schema for the environment variables
 */
export type SchemaBuilderType<T extends Record<string, EnvironmentSchemaTypes>> = (
  schema: Schema
) => T;
