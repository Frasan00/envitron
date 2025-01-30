import { z } from 'zod';

export type EnvParsedFileType = Record<
  string,
  number | string | boolean | any[] | object | undefined
>;

/**
 * @description - An object that contains the options for the environment manager
 * @param logs - A boolean that determines if the environment manager should log the environment variables
 * @param rootPath - A string that contains the root path for the environment manager
 * @param throwErrorOnValidationFail - A boolean that determines if the environment manager should throw an error if the validation fails
 * @param envFileHierarchy - An array of strings that contains the hierarchy of the environment files
 * @param loadProcessEnv - A boolean that determines if the environment manager should load the process.env variables
 */
export type CreateEnvSchemaOptions = {
  logs?: boolean;
  rootPath?: string;
  throwErrorOnValidationFail?: boolean;
  envFileHierarchy?: string[];
  loadProcessEnv?: boolean;
};

export type SchemaBuilderType<T extends Record<string, SchemaTypes>> = (
  schema: typeof z
) => z.ZodObject<T>;

export type SchemaTypes = z.ZodTypeAny;
