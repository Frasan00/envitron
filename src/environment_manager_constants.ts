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
  envFileHierarchy?: envFileNames[];
  loadProcessEnv?: boolean;
};

export type SchemaBuilderType<T extends Record<string, SchemaTypes>> = (
  schema: typeof z
) => z.ZodObject<T>;

export type SchemaTypes = z.ZodTypeAny;

export type envFileNames =
  | '.env'
  | '.env.local'
  | '.env.development'
  | '.env.production'
  | '.env.test'
  | '.env.staging'
  | '.local.env'
  | '.development.env'
  | '.production.env'
  | '.test.env'
  | '.staging.env'
  | '.env.local.local'
  | '.env.local.development'
  | '.env.local.production'
  | '.env.local.test'
  | '.env.local.staging'
  | '.env.development.local'
  | '.env.development.development'
  | '.env.development.production'
  | '.env.development.test'
  | '.env.development.staging'
  | '.env.production.local'
  | '.env.production.development'
  | '.env.production.production'
  | '.env.production.test'
  | '.env.production.staging'
  | '.env.test.local'
  | '.env.test.development'
  | '.env.test.production'
  | '.env.test.test'
  | '.env.test.staging'
  | '.env.staging.local'
  | '.env.staging.development'
  | '.env.staging.production'
  | '.env.staging.test';
