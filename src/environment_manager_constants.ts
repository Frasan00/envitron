import { z } from 'zod';

/**
 * @description - An object that contains the parsed environment variables
 */
export type EnvParsedFileType = Record<
  string,
  number | string | boolean | any[] | object | undefined
>;

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
   */
  rootPath?: string;

  /**
   * @description - A boolean that determines if an error should be thrown when the validation fails
   */
  throwErrorOnValidationFail?: boolean;

  /**
   * @description - An array of strings that contains the hierarchy of the environment files - defaults to ['.env']
   * @example - ['.env', '.env.local', '.env.development']
   */
  envFileHierarchy?: string[];

  /**
   * @description - A boolean that determines if the process.env should be loaded into the environment manager - defaults to false
   */
  loadProcessEnv?: boolean;
};

/**
 * @description - A function that returns the schema for the environment variables
 */
export type SchemaBuilderType<T extends Record<string, SchemaTypes>> = (
  schema: typeof z
) => z.ZodObject<T>;

/**
 * @description - A type that represents the schema for the environment variables
 */
export type SchemaTypes = z.ZodTypeAny;
