var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
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
var Logger_default = logger;

// src/EnvironmentManager.ts
import { z } from "zod";
var EnvironmentManager = class _EnvironmentManager {
  constructor(schemaBuilder, options) {
    __publicField(this, "schema");
    __publicField(this, "rootPath");
    __publicField(this, "envs");
    __publicField(this, "logs");
    __publicField(this, "throwErrorOnValidationFail");
    __publicField(this, "envFileHierarchy");
    this.rootPath = path.resolve(process.cwd(), options?.rootPath || "");
    this.logs = options?.logs ?? true;
    this.throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    this.envFileHierarchy = options?.envFileHierarchy || [".env"];
    this.envs = this.collectEnvs();
    this.schema = schemaBuilder(z);
  }
  /**
   * @description - Used for schema-less environment variable retrieval
   */
  static getInstance(options) {
    const envFileHierarchy = options?.envFileHierarchy || [".env"];
    const logs = options?.logs ?? true;
    const throwErrorOnValidationFail = false;
    const rootPath = path.resolve(process.cwd(), options?.rootPath || "");
    const envManagerInstance = new _EnvironmentManager(() => z.object({}), {
      logs,
      rootPath,
      throwErrorOnValidationFail,
      envFileHierarchy
    });
    envManagerInstance.envs = envManagerInstance.collectEnvs();
    return envManagerInstance;
  }
  /**
   * @description - This function is used to create the schema for the environment variables
   * @param cb - A callback function that returns the schema for the environment variables
   * @param options - An object that contains the options for the environment manager
   */
  static async createEnvSchema(schemaBuilder, options) {
    const envFileHierarchy = options?.envFileHierarchy || [".env"];
    const logs = options?.logs ?? true;
    const throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    const rootPath = path.resolve(process.cwd(), options?.rootPath || "");
    const envManagerInstance = new _EnvironmentManager(schemaBuilder, {
      logs,
      rootPath,
      throwErrorOnValidationFail,
      envFileHierarchy
    });
    envManagerInstance.envs = envManagerInstance.collectEnvs();
    try {
      await envManagerInstance.schema.parseAsync(envManagerInstance.envs);
    } catch (error) {
      if (envManagerInstance.throwErrorOnValidationFail) {
        throw error;
      }
      Logger_default.error(error);
    }
    return envManagerInstance;
  }
  get(key, defaultValue, schema = this.schema) {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }
    const value = this.envs[key];
    if (value === void 0) {
      const schemaDefaultValue = schema.shape[key]?._def.defaultValue?.() ?? void 0;
      return defaultValue ?? schemaDefaultValue;
    }
    const retrievedEnv = schema.shape[key];
    if (!retrievedEnv) {
      return value;
    }
    return retrievedEnv.parse(value);
  }
  /**
   * @returns - Returns all the environment variables part of the schema
   */
  getAll(schema = this.schema) {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }
    return this.envs;
  }
  collectEnvs() {
    const envFileHierarchy = this.envFileHierarchy;
    if (typeof envFileHierarchy === "string") {
      const envPath = `${this.rootPath}/${envFileHierarchy}`;
      if (!fs.existsSync(envPath) && !this.throwErrorOnValidationFail) {
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
    if (this.throwErrorOnValidationFail) {
      throw new Error("Environment file not found");
    }
    log("No environment file in the hierarchy list found", this.logs);
    return {};
  }
  parseEnvFile(envPath) {
    const envFile = fs.readFileSync(envPath, "utf8");
    const envs = envFile.split("\n");
    const envsObject = {};
    const regex = /^(\S+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\[.*\]|\{.*\}|\S+))/;
    for (const env of envs) {
      const match = env.match(regex);
      if (!match) {
        continue;
      }
      const key = match[1];
      let value = match[2] || match[3] || match[4];
      if (value && value.trim().startsWith("#")) {
        continue;
      }
      if (value === void 0) {
        value = "";
      }
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value.slice(1, -1).split(",").map((v) => v.trim().replace(/^["']|["']$/g, ""));
      }
      if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          console.error(`Failed to parse JSON in the environment file for key ${key}: ${value}`);
        }
      }
      if (value === "true" || value === "false") {
        value = Boolean(value);
      }
      envsObject[key] = value;
    }
    return envsObject;
  }
};

// src/index.ts
var getInstance = EnvironmentManager.getInstance;
var createEnvSchema = EnvironmentManager.createEnvSchema;
var src_default = {
  getInstance,
  createEnvSchema
};
export {
  createEnvSchema,
  src_default as default,
  getInstance
};
//# sourceMappingURL=index.mjs.map