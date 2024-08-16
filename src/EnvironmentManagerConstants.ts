import vine, { VineEnum } from '@vinejs/vine';
import * as vineLib from '@vinejs/vine';
import { SchemaTypes } from '@vinejs/vine/build/src/types';
import { OptionalModifier } from '@vinejs/vine/build/src/schema/base/literal';

// Types
type ParsedNumber = ReturnType<typeof vine.number>;
type ParsedString = ReturnType<typeof vine.string>;
type ParsedBoolean = ReturnType<typeof vine.boolean>;
type ParsedEnum<T extends readonly (string | number)[]> = VineEnum<T>;
type ParsedDate = ReturnType<typeof vine.date>;

// Optional types
type OptionalNumber = OptionalModifier<ParsedNumber>;
type OptionalString = OptionalModifier<ParsedString>;
type OptionalBoolean = OptionalModifier<ParsedBoolean>;
type OptionalEnum<T extends readonly (string | number)[]> = OptionalModifier<ParsedEnum<T>>;
type OptionalDate = OptionalModifier<ParsedDate>;

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

export type ReturnTypeObject<Properties extends Record<string, SchemaTypes>> = ReturnType<
  typeof vineLib.default.object<Properties>
>;

export type InferSchemaType<T, K extends keyof T> = T[K] extends ParsedNumber
  ? number
  : T[K] extends ParsedString
    ? string
    : T[K] extends ParsedBoolean
      ? boolean
      : T[K] extends ParsedEnum<infer U>
        ? U[number]
        : T[K] extends ParsedDate
          ? Date
          : T[K] extends OptionalNumber
            ? number | undefined
            : T[K] extends OptionalString
              ? string | undefined
              : T[K] extends OptionalBoolean
                ? boolean | undefined
                : T[K] extends OptionalEnum<infer U>
                  ? U[number] | undefined
                  : T[K] extends OptionalDate
                    ? Date | undefined
                    : any;
