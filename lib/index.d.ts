import { z } from 'zod';

type EnvParsedFileType = Record<string, number | string | boolean | any[] | object | undefined>;
type SchemaTypes = z.ZodTypeAny;
type envFileNames = '.env' | '.env.local' | '.env.development' | '.env.production' | '.env.test' | '.env.staging' | '.local.env' | '.development.env' | '.production.env' | '.test.env' | '.staging.env' | '.env.local.local' | '.env.local.development' | '.env.local.production' | '.env.local.test' | '.env.local.staging' | '.env.development.local' | '.env.development.development' | '.env.development.production' | '.env.development.test' | '.env.development.staging' | '.env.production.local' | '.env.production.development' | '.env.production.production' | '.env.production.test' | '.env.production.staging' | '.env.test.local' | '.env.test.development' | '.env.test.production' | '.env.test.test' | '.env.test.staging' | '.env.staging.local' | '.env.staging.development' | '.env.staging.production' | '.env.staging.test';

declare class EnvironmentManager<T extends Record<string, SchemaTypes>> {
    schema: z.ZodObject<T>;
    private rootPath;
    private envs;
    private logs;
    private throwErrorOnValidationFail;
    private envFileHierarchy;
    private constructor();
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
    static createEnvSchema<T extends Record<string, SchemaTypes>>(schemaBuilder: (schema: typeof z) => z.ZodObject<T>, options?: {
        logs?: boolean;
        rootPath?: string;
        throwErrorOnValidationFail?: boolean;
        envFileHierarchy?: envFileNames[];
    }): EnvironmentManager<T>;
    /**
     * @description - This function is used to get a value from the environment variables from the schema
     */
    get<K extends keyof z.infer<z.ZodObject<T>>>(key: K, defaultValue?: any): z.infer<z.ZodObject<T>>[K];
    get(key: string, defaultValue?: any): any;
    /**
     * @returns - Returns all the environment variables part of the schema
     */
    getAll(): z.infer<z.ZodObject<T>> & {
        [key: string]: any;
    };
    protected collectEnvs(): EnvParsedFileType;
    protected parseEnvFile(envPath: string): EnvParsedFileType;
}

declare const getInstance: typeof EnvironmentManager.getInstance;
declare const createEnvSchema: typeof EnvironmentManager.createEnvSchema;
declare const _default: {
    getInstance: typeof EnvironmentManager.getInstance;
    createEnvSchema: typeof EnvironmentManager.createEnvSchema;
};

export { createEnvSchema, _default as default, getInstance };
