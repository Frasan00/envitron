import * as vine from '@vinejs/vine';
import vine__default, { VineEnum } from '@vinejs/vine';
import { SchemaTypes } from '@vinejs/vine/build/src/types';
import { OptionalModifier } from '@vinejs/vine/build/src/schema/base/literal';

type ParsedNumber = ReturnType<typeof vine__default.number>;
type ParsedString = ReturnType<typeof vine__default.string>;
type ParsedBoolean = ReturnType<typeof vine__default.boolean>;
type ParsedEnum<T extends readonly (string | number)[]> = VineEnum<T>;
type ParsedDate = ReturnType<typeof vine__default.date>;
type OptionalNumber = OptionalModifier<ParsedNumber>;
type OptionalString = OptionalModifier<ParsedString>;
type OptionalBoolean = OptionalModifier<ParsedBoolean>;
type OptionalEnum<T extends readonly (string | number)[]> = OptionalModifier<ParsedEnum<T>>;
type OptionalDate = OptionalModifier<ParsedDate>;
type envFileNames = '.env' | '.env.local' | '.env.development' | '.env.production' | '.env.test' | '.env.staging' | '.local.env' | '.development.env' | '.production.env' | '.test.env' | '.staging.env' | '.env.local.local' | '.env.local.development' | '.env.local.production' | '.env.local.test' | '.env.local.staging' | '.env.development.local' | '.env.development.development' | '.env.development.production' | '.env.development.test' | '.env.development.staging' | '.env.production.local' | '.env.production.development' | '.env.production.production' | '.env.production.test' | '.env.production.staging' | '.env.test.local' | '.env.test.development' | '.env.test.production' | '.env.test.test' | '.env.test.staging' | '.env.staging.local' | '.env.staging.development' | '.env.staging.production' | '.env.staging.test';
type ReturnTypeObject<Properties extends Record<string, SchemaTypes>> = ReturnType<typeof vine.default.object<Properties>>;
type InferSchemaType<T, K extends keyof T> = T[K] extends ParsedNumber ? number : T[K] extends ParsedString ? string : T[K] extends ParsedBoolean ? boolean : T[K] extends ParsedEnum<infer U> ? U[number] : T[K] extends ParsedDate ? Date : T[K] extends OptionalNumber ? number | undefined : T[K] extends OptionalString ? string | undefined : T[K] extends OptionalBoolean ? boolean | undefined : T[K] extends OptionalEnum<infer U> ? U[number] | undefined : T[K] extends OptionalDate ? Date | undefined : any;

declare class EnvironmentManager<T extends Record<string, SchemaTypes>> {
    schema: ReturnTypeObject<T>;
    private rootPath;
    private envs;
    private logs;
    private throwErrorOnValidationFail;
    private envFileHierarchy;
    private constructor();
    /**
     *
     * @returns - Returns all the environment variables
     */
    getAll(): Record<string, string | number | boolean | undefined>;
    /**
     * @description - Used for schema-less environment variable retrieval
     */
    static getInstance<T extends Record<string, SchemaTypes>>(options?: {
        logs?: boolean;
        rootPath?: string;
        envFileHierarchy?: envFileNames[];
    }): EnvironmentManager<T>;
    /**
     * @description - This function is used to create the schema for the environment variables
     * @param cb - A callback function that returns the schema for the environment variables
     * @param options - An object that contains the options for the environment manager
     */
    static createEnvSchema<T extends Record<string, SchemaTypes>>(schemaBuilder: (vineInstance: typeof vine__default) => ReturnTypeObject<T>, options?: {
        logs?: boolean;
        rootPath?: string;
        throwErrorOnValidationFail?: boolean;
        envFileHierarchy?: envFileNames[];
    }): Promise<EnvironmentManager<T>>;
    /**
     * @description - This function is used to get a raw value from the environment variables outside the schema
     * @param key
     * @param defaultValue
     * @returns
     */
    getRaw(key: string, defaultValue?: any): string | number | boolean | undefined;
    /**
     * @description - This function is used to get a value from the environment variables from the schema
     * @description - In order to retrieve an outside schema value, use the getRaw function
     * @param key
     * @param defaultValue
     * @returns
     */
    get<K extends keyof T>(key: K, defaultValue?: any, schema?: ReturnTypeObject<T>): InferSchemaType<T, K>;
    protected collectEnvs(): Record<string, string | number | boolean>;
    protected parseEnvFile(envPath: string): Record<string, string | number | boolean>;
}

declare const getInstance: typeof EnvironmentManager.getInstance;
declare const createEnvSchema: typeof EnvironmentManager.createEnvSchema;

export { createEnvSchema, getInstance };
