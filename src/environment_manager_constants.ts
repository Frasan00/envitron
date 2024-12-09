import { z } from 'zod';

export type EnvParsedFileType = Record<
  string,
  number | string | boolean | any[] | object | undefined
>;

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
