import * as _vinejs_vine_build_src_types from '@vinejs/vine/build/src/types';
import { SchemaTypes } from '@vinejs/vine/build/src/types';
import * as vineLib from '@vinejs/vine';
import vineLib__default from '@vinejs/vine';

type ReturnTypeObject<Properties extends Record<string, SchemaTypes>> = ReturnType<typeof vineLib.default.object<Properties>>;
type envFileNames = '.env' | '.env.local' | '.env.development' | '.env.production' | '.env.test' | '.env.staging' | '.local.env' | '.development.env' | '.production.env' | '.test.env' | '.staging.env' | '.env.local.local' | '.env.local.development' | '.env.local.production' | '.env.local.test' | '.env.local.staging' | '.env.development.local' | '.env.development.development' | '.env.development.production' | '.env.development.test' | '.env.development.staging' | '.env.production.local' | '.env.production.development' | '.env.production.production' | '.env.production.test' | '.env.production.staging' | '.env.test.local' | '.env.test.development' | '.env.test.production' | '.env.test.test' | '.env.test.staging' | '.env.staging.local' | '.env.staging.development' | '.env.staging.production' | '.env.staging.test';
declare class EnvironmentManager<T extends Record<string, SchemaTypes>> {
    schema: ReturnTypeObject<T>;
    private rootPath;
    private envs;
    private logs;
    private throwErrorOnValidationFail;
    private envFileHierarchy;
    constructor();
    /**
     *
     * @returns - Returns all the environment variables
     */
    getAll(): Record<string, string | number | boolean | undefined>;
    /**
     * @description - This function is used to create the schema for the environment variables
     * @param cb - A callback function that returns the schema for the environment variables
     */
    createEnvSchema(schemaBuilder: (vineInstance: typeof vineLib__default) => ReturnTypeObject<T>, options?: {
        logs?: boolean;
        rootPath?: string;
        throwErrorOnValidationFail?: boolean;
        envFileHierarchy?: envFileNames[];
    }): Promise<void>;
    /**
     * @description - This function is used to get a value from the environment variables
     * @param key
     * @param defaultValue
     * @returns
     */
    get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K] | undefined;
    protected collectEnvs(): Record<string, string | number | boolean>;
    protected parseEnvFile(envPath: string): Record<string, string | number | boolean>;
}

declare const env: EnvironmentManager<Record<string, _vinejs_vine_build_src_types.SchemaTypes>>;

export { env as default };
