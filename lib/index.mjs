var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/rules/rule.ts
var Rule = class {
  constructor(valueType) {
    __publicField(this, "key");
    __publicField(this, "valueType");
    __publicField(this, "isOptional");
    this.key = "";
    this.valueType = valueType;
    this.isOptional = false;
  }
  validateAndParse(value, rule) {
    switch (rule.valueType) {
      case "string" /* string */:
        return this.validateStringRule(value, rule);
      case "number" /* number */:
        return this.validateNumberRule(value, rule);
      case "boolean" /* boolean */:
        return this.validateBooleanRule(value, rule);
      case "enum" /* enum */:
        return this.validateEnumRule(value, rule);
      default:
        return void 0;
    }
  }
  validateStringRule(value, rule) {
    if (rule.isOptional && !value) {
      return void 0;
    }
    if (typeof value !== "string") {
      return null;
    }
    if (rule.minLength && value.length < rule.minLength) {
      return null;
    }
    if (rule.maxLength && value.length > rule.maxLength) {
      return null;
    }
    if (rule.ip && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) {
      return null;
    }
    if (rule.url && !/^(http|https):\/\/[^\s]+$/.test(value)) {
      return null;
    }
    if (rule.email && !/^[^\s]+@[^\s]+$/.test(value)) {
      return null;
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      return null;
    }
    return value.trim();
  }
  validateNumberRule(value, rule) {
    if (rule.isOptional && !value) {
      return void 0;
    }
    if (isNaN(value)) {
      return null;
    }
    if (rule.minValue && value < rule.minValue) {
      return null;
    }
    if (rule.maxValue && value > rule.maxValue) {
      return null;
    }
    return value;
  }
  validateEnumRule(value, rule) {
    if (rule.isOptional && !value) {
      return void 0;
    }
    if (typeof value !== "string") {
      return null;
    }
    if (!rule.values.includes(value)) {
      return null;
    }
    return value;
  }
  validateBooleanRule(value, rule) {
    if (rule.isOptional && !value) {
      return void 0;
    }
    if (value !== "true" && value !== "false") {
      return null;
    }
    return Boolean(value);
  }
};

// src/rules/Boolean/BooleanRule.ts
var BooleanRule = class extends Rule {
  constructor() {
    super("boolean" /* boolean */);
  }
};

// src/rules/Boolean/BooleanRuleOptions.ts
var BooleanRuleOptions = class extends BooleanRule {
  constructor() {
    super();
  }
  optional() {
    this.isOptional = true;
    return this;
  }
};

// src/rules/Enum/EnumRule.ts
var EnumRule = class extends Rule {
  constructor(values) {
    super("enum" /* enum */);
    __publicField(this, "values");
    this.values = values;
  }
};

// src/rules/Enum/EnumRuleOptions.ts
var EnumRuleOptions = class extends EnumRule {
  constructor(values) {
    super(values);
    __publicField(this, "values");
    this.values = values;
  }
  optional() {
    this.isOptional = true;
    return this;
  }
};

// src/rules/Number/NumberRule.ts
var NumberRule = class extends Rule {
  constructor() {
    super("number" /* number */);
  }
};

// src/rules/Number/NumberRuleOptions.ts
var NumberRuleOptions = class extends NumberRule {
  constructor() {
    super();
    __publicField(this, "minValue");
    __publicField(this, "maxValue");
    this.minValue = Number.MIN_SAFE_INTEGER;
    this.maxValue = Number.MAX_SAFE_INTEGER;
  }
  min(min) {
    this.minValue = min;
    return this;
  }
  max(max) {
    this.maxValue = max;
    return this;
  }
  range(min, max) {
    this.minValue = min;
    this.maxValue = max;
    return this;
  }
  optional() {
    this.isOptional = true;
    return this;
  }
};

// src/rules/String/StringRuleOptions.ts
var StringRuleOptions = class extends Rule {
  constructor() {
    super("string" /* string */);
    __publicField(this, "minLength");
    __publicField(this, "maxLength");
    __publicField(this, "ip");
    __publicField(this, "url");
    __publicField(this, "email");
    __publicField(this, "pattern");
    this.ip = false;
    this.url = false;
    this.email = false;
  }
  setMinLength(minLength) {
    this.minLength = minLength;
    return this;
  }
  setMaxLength(maxLength) {
    this.maxLength = maxLength;
    return this;
  }
  setIp() {
    this.ip = true;
    return this;
  }
  mustBeUrl() {
    this.url = true;
    return this;
  }
  mustBeEmail() {
    this.email = true;
    return this;
  }
  regex(pattern) {
    this.pattern = pattern;
    return this;
  }
  optional() {
    this.isOptional = true;
    return this;
  }
};

// src/schema/Schema.ts
var EnvSchema = class {
  /**
   * @description Schema class is used to define the rules for the environment variables
   * @description rules - object containing the rules for the environment variables
   * @description envFileHierarchy - array of strings containing the hierarchy of the env files to be loaded
   * @description throwErrorOnValidationFail - boolean to determine if an error should be thrown when env validation fails
   */
  constructor() {
    __publicField(this, "envFileHierarchy");
    __publicField(this, "throwErrorOnValidationFail");
    __publicField(this, "envFilePath");
    __publicField(this, "logs");
    this.envFileHierarchy = [".env"];
    this.throwErrorOnValidationFail = true;
    this.logs = true;
  }
  /**
   * @description String rule is used to define environment variables that contain strings
   * @description Used for simple strings that do not require any special validation, note string envs will be trimmed, if you need to preserve whitespace use the literal rule
   */
  string() {
    return new StringRuleOptions();
  }
  /**
   * @description Number rule is used to define environment variables that contain numbers
   * @description Used for numbers that require min and max validation
   * @param options - object containing min or max properties
   */
  number() {
    return new NumberRuleOptions();
  }
  /**
   * @description Enum rule is used to define environment variables that contain a set of predefined values
   * @description Used for environment variables that must be one of a set of values
   * @param values - array of strings containing the allowed values
   */
  enum(values) {
    return new EnumRuleOptions(values);
  }
  /**
   * @description Boolean rule is used to define environment variables that contain boolean values
   * @description Used for environment variables that must be either true or false
   */
  boolean() {
    return new BooleanRuleOptions();
  }
};

// src/EnvironmentManager.ts
import fs from "fs";
import path from "path";

// src/Logger.ts
import winston from "winston";
var colors = {
  info: "\x1B[32m",
  warn: "\x1B[33m",
  error: "\x1B[31m"
};
var logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp }) => {
    const color = colors[level] || "\x1B[0m";
    return `${timestamp} ${color}${level}\x1B[0m: ${color}${message}\x1B[0m`;
  })
);
var consoleTransport = new winston.transports.Console();
var fileTransport = new winston.transports.File({ filename: "logfile.log" });
var logger = winston.createLogger({
  format: logFormat,
  transports: [consoleTransport, fileTransport]
});
function log(message, logs) {
  if (!logs) {
    return;
  }
  logger.info(message);
}

// src/EnvironmentManager.ts
var EnvironmentManager = class {
  constructor() {
    __publicField(this, "rules");
    __publicField(this, "schema");
    __publicField(this, "rootPath");
    __publicField(this, "envs");
    __publicField(this, "logs");
    this.schema = new EnvSchema();
    this.rules = {};
    this.rootPath = "";
    this.envs = {};
    this.logs = true;
  }
  /**
   * @description - This function is used to create the schema for the environment variables
   * @param cb - A callback function that returns the schema for the environment variables
   */
  createEnvSchema(cb) {
    this.rules = cb(this.schema);
    for (const key in this.rules) {
      this.rules[key].key = key;
    }
    this.logs = this.schema.logs;
    this.rootPath = this.schema.envFilePath || path.resolve(__dirname);
    this.envs = this.collectEnvs();
    this.validateRequiredEnvs();
  }
  getEnv(key, defaultValue) {
    const rule = this.rules[key];
    const value = this.envs[key];
    if (!rule) {
      return value;
    }
    return this.envs[key] || defaultValue;
  }
  collectEnvs() {
    const envFileHierarchy = this.schema.envFileHierarchy;
    if (typeof envFileHierarchy === "string") {
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
        log(`Environment file not found: ${envPath}`, this.logs);
        log(`Trying next environment file...`, this.logs);
        continue;
      }
      return this.parseEnvFile(envPath);
    }
    if (this.schema.throwErrorOnValidationFail) {
      throw new Error("Environment file not found");
    }
    log("No environment file in the hierarchy list found", this.logs);
    return {};
  }
  parseEnvFile(envPath) {
    const envFile = fs.readFileSync(envPath, "utf8");
    const envs = envFile.split("\n");
    const envsObject = {};
    const regex = /^(\S+)=\s*(?:"([^"]*)"|(.*))/;
    for (const env2 of envs) {
      const match = env2.match(regex);
      if (match) {
        const key = match[1];
        let value = match[2] || match[3];
        if (!match[2]) {
          value = value.trim();
        }
        envsObject[key] = value;
        const validatedValue = this.validateEnv(key, envsObject[key]);
        if (validatedValue === void 0) {
          continue;
        }
        envsObject[key] = validatedValue;
      }
    }
    return envsObject;
  }
  validateRequiredEnvs() {
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
  validateEnv(envKey, envValue) {
    const rule = this.rules[envKey];
    if (!rule) {
      return void 0;
    }
    const parsedValue = rule.validateAndParse(envValue, rule);
    if (parsedValue === void 0) {
      return void 0;
    }
    if (parsedValue === null) {
      if (this.schema.throwErrorOnValidationFail) {
        throw new Error(
          `
Schema Validation failed for environment variable ${envKey}
: ${JSON.stringify(rule, null, 2)}`
        );
      }
      log(
        `Schema Validation failed for environment variable ${envKey}
: ${JSON.stringify(rule, null, 2)}`,
        this.logs
      );
      return void 0;
    }
    return parsedValue;
  }
};

// src/index.ts
var env = new EnvironmentManager();
var src_default = env;
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map