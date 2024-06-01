import Rule, { RuleValueTypes } from './rules/rule';
import EnvSchema from './schema/Schema';
import fs from 'fs';
import path from 'path';
import { log } from './Logger';

type GetEnvDynamicType<T> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : T extends 'boolean'
      ? boolean
      : T extends 'enum'
        ? string
        : string;

export default class EnvironmentManager {
  private rules: Record<string, Rule>;
  private schema: EnvSchema;
  private rootPath: string;
  private envs: Record<string, RuleValueTypes>;
  private logs: boolean;

  constructor() {
    this.schema = new EnvSchema();
    this.rules = {};
    this.rootPath = '';
    this.envs = {};
    this.logs = true;
  }

  /**
   * @description - This function is used to create the schema for the environment variables
   * @param cb - A callback function that returns the schema for the environment variables
   */
  public createEnvSchema(cb: (schema: EnvSchema) => Record<string, Rule>) {
    this.rules = cb(this.schema);
    for (const key in this.rules) {
      this.rules[key].key = key;
    }

    this.rootPath = path.resolve(__dirname);
    this.envs = this.collectEnvs();
    this.validateRequiredEnvs();
  }

  public getEnv<Key extends keyof typeof this.rules>(
    key: Key
  ): GetEnvDynamicType<(typeof this.rules)[Key]['valueType']> | undefined {
    const rule = this.rules[key];
    const value = this.envs[key];
    if (!rule) {
      return value;
    }

    return this.envs[key] as GetEnvDynamicType<(typeof this.rules)[Key]['valueType']>;
  }

  protected collectEnvs(): Record<string, RuleValueTypes> {
    const envFileHierarchy = this.schema.envFileHierarchy;
    if (typeof envFileHierarchy === 'string') {
      const envPath = `${this.rootPath}/${envFileHierarchy}`;
      if (!fs.existsSync(envPath) && !this.schema.throwErrorOnValidationFail) {
        log(`Environment file not found: ${envPath}`, this.logs);
        return {};
      }

      if (!fs.existsSync(envPath)) {
        throw new Error(`Environment file not found: ${envPath}`);
      }

      return this.parseEnvFile(envPath);
    }

    for (const envFile of envFileHierarchy) {
      const envPath = `${this.rootPath}/${envFile}`;
      if (!fs.existsSync(envPath)) {
        continue;
      }

      return this.parseEnvFile(envPath);
    }

    if (this.schema.throwErrorOnValidationFail) {
      throw new Error('Environment file not found');
    }

    log('No environment file in the hierarchy list found', this.logs);
    return {};
  }

  protected parseEnvFile(envPath: string): Record<string, RuleValueTypes> {
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envs = envFile.split('\n');
    const envsObject: Record<string, RuleValueTypes> = {};

    const regex = /^(\S+)=\s*(?:"([^"]*)"|(.*))/;

    for (const env of envs) {
      const match = env.match(regex);
      if (match) {
        const key = match[1];
        let value = match[2] || match[3];

        if (!match[2]) {
          value = value.trim();
        }

        envsObject[key] = value;

        const validatedValue = this.validateEnv(key, envsObject[key]);
        if (validatedValue === undefined) {
          continue;
        }

        envsObject[key] = validatedValue;
      }
    }

    return envsObject as Record<string, RuleValueTypes>;
  }

  protected validateRequiredEnvs() {
    for (const key in this.rules) {
      const rule = this.rules[key];
      if (!rule.isOptional && !this.envs[key]) {
        if (this.schema.throwErrorOnValidationFail) {
          throw new Error(`Required environment variable not found: ${key}`);
        }

        log(`Required environment variable not found: ${key}`, this.logs);
      }
    }
  }

  protected validateEnv(envKey: string, envValue: RuleValueTypes): RuleValueTypes | undefined {
    const rule = this.rules[envKey];
    if (!rule) {
      return undefined;
    }

    const parsedValue = rule.validateAndParse(envValue, rule);
    if (parsedValue === undefined) {
      return undefined;
    }

    if (parsedValue === null) {
      if (this.schema.throwErrorOnValidationFail) {
        throw new Error(
          `\nSchema Validation failed for environment variable ${envKey}\n: ${JSON.stringify(rule, null, 2)}`
        );
      }

      log(
        `Schema Validation failed for environment variable ${envKey}\n: ${JSON.stringify(rule, null, 2)}`,
        this.logs
      );
      return undefined;
    }

    return parsedValue;
  }

  private prettifyJsonPrint(json: Object) {
    return JSON.stringify(json, null, 2);
  }
}
