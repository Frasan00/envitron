type RuleValueTypes = string | number | boolean;
declare enum RuleValueEnum {
    string = "string",
    number = "number",
    boolean = "boolean",
    enum = "enum"
}
declare abstract class Rule {
    key: string;
    valueType: RuleValueEnum;
    isOptional: boolean;
    constructor(valueType: RuleValueEnum);
    validateAndParse(value: RuleValueTypes, rule: Rule): RuleValueTypes | null | undefined;
    private validateStringRule;
    private validateNumberRule;
    private validateEnumRule;
    private validateBooleanRule;
}

declare class BooleanRule extends Rule {
    constructor();
}

declare class BooleanRuleOptions extends BooleanRule {
    constructor();
    optional(): BooleanRule;
}

declare class EnumRule extends Rule {
    values: string[];
    constructor(values: string[]);
}

declare class EnumRuleOptions extends EnumRule {
    values: string[];
    constructor(values: string[]);
    optional(): EnumRule;
}

declare class NumberRule extends Rule {
    constructor();
}

declare class NumberRuleOptions extends NumberRule {
    minValue: number;
    maxValue: number;
    constructor();
    min(min: number): NumberRuleOptions;
    max(max: number): NumberRuleOptions;
    range(min: number, max: number): NumberRuleOptions;
    optional(): NumberRule;
}

declare class StringRule extends Rule {
    constructor();
}

declare class StringRuleOptions extends Rule {
    minLength?: number;
    maxLength?: number;
    ip: boolean;
    url: boolean;
    email: boolean;
    pattern?: RegExp;
    constructor();
    setMinLength(minLength: number): this;
    setMaxLength(maxLength: number): this;
    setIp(): this;
    mustBeUrl(): this;
    mustBeEmail(): this;
    regex(pattern: RegExp): this;
    optional(): StringRule;
}

type envFileNames = '.env' | '.env.local' | '.env.development' | '.env.production' | '.env.test' | '.env.staging' | '.local.env' | '.development.env' | '.production.env' | '.test.env' | '.staging.env';
declare class EnvSchema {
    envFileHierarchy: envFileNames[] | envFileNames;
    throwErrorOnValidationFail: boolean;
    /**
     * @description Schema class is used to define the rules for the environment variables
     * @description rules - object containing the rules for the environment variables
     * @description envFileHierarchy - array of strings containing the hierarchy of the env files to be loaded
     * @description throwErrorOnValidationFail - boolean to determine if an error should be thrown when env validation fails
     */
    constructor();
    /**
     * @description String rule is used to define environment variables that contain strings
     * @description Used for simple strings that do not require any special validation, note string envs will be trimmed, if you need to preserve whitespace use the literal rule
     */
    string(): StringRuleOptions;
    /**
     * @description Number rule is used to define environment variables that contain numbers
     * @description Used for numbers that require min and max validation
     * @param options - object containing min or max properties
     */
    number(): NumberRuleOptions;
    /**
     * @description Enum rule is used to define environment variables that contain a set of predefined values
     * @description Used for environment variables that must be one of a set of values
     * @param values - array of strings containing the allowed values
     */
    enum(values: string[]): EnumRuleOptions;
    /**
     * @description Boolean rule is used to define environment variables that contain boolean values
     * @description Used for environment variables that must be either true or false
     */
    boolean(): BooleanRuleOptions;
}

type GetEnvDynamicType<T> = T extends 'string' ? string : T extends 'number' ? number : T extends 'boolean' ? boolean : T extends 'enum' ? string : string;
declare class EnvironmentManager {
    private rules;
    private schema;
    private rootPath;
    private envs;
    private logs;
    constructor();
    /**
     * @description - This function is used to create the schema for the environment variables
     * @param cb - A callback function that returns the schema for the environment variables
     */
    createEnvSchema(cb: (schema: EnvSchema) => Record<string, Rule>): void;
    getEnv<Key extends keyof typeof this.rules>(key: Key): GetEnvDynamicType<(typeof this.rules)[Key]['valueType']> | undefined;
    protected collectEnvs(): Record<string, RuleValueTypes>;
    protected parseEnvFile(envPath: string): Record<string, RuleValueTypes>;
    protected validateRequiredEnvs(): void;
    protected validateEnv(envKey: string, envValue: RuleValueTypes): RuleValueTypes | undefined;
}

declare const env: EnvironmentManager;

export { env as default };
