"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createEnvSchema: () => createEnvSchema,
  getInstance: () => getInstance
});
module.exports = __toCommonJS(src_exports);

// src/EnvironmentManager.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));

// src/Logger.ts
var import_winston = __toESM(require("winston"));
var colors = {
  info: "\x1B[32m",
  warn: "\x1B[33m",
  error: "\x1B[31m"
};
var logFormat = import_winston.default.format.combine(
  import_winston.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  import_winston.default.format.printf(({ level, message, timestamp }) => {
    const color = colors[level] || "\x1B[0m";
    return `${timestamp} ${color}${level}\x1B[0m: ${color}${message}\x1B[0m`;
  })
);
var consoleTransport = new import_winston.default.transports.Console();
var fileTransport = new import_winston.default.transports.File({ filename: "logfile.log" });
var logger = import_winston.default.createLogger({
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
var import_zod = require("zod");
var EnvironmentManager = class _EnvironmentManager {
  constructor(schemaBuilder, options) {
    __publicField(this, "schema");
    __publicField(this, "rootPath");
    __publicField(this, "envs");
    __publicField(this, "logs");
    __publicField(this, "throwErrorOnValidationFail");
    __publicField(this, "envFileHierarchy");
    this.rootPath = import_path.default.resolve(process.cwd(), options?.rootPath || "");
    this.logs = options?.logs ?? true;
    this.throwErrorOnValidationFail = options?.throwErrorOnValidationFail ?? true;
    this.envFileHierarchy = options?.envFileHierarchy || [".env"];
    this.envs = this.collectEnvs();
    this.schema = schemaBuilder(import_zod.z);
  }
  /**
   *
   * @returns - Returns all the environment variables
   */
  getAll() {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }
    return this.envs;
  }
  /**
   * @description - Used for schema-less environment variable retrieval
   */
  static getInstance(options) {
    const envFileHierarchy = options?.envFileHierarchy || [".env"];
    const logs = options?.logs ?? true;
    const throwErrorOnValidationFail = false;
    const rootPath = import_path.default.resolve(process.cwd(), options?.rootPath || "");
    const envManagerInstance = new _EnvironmentManager(() => import_zod.z.object({}), {
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
    const rootPath = import_path.default.resolve(process.cwd(), options?.rootPath || "");
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
  /**
   * @description - This function is used to get a raw value from the environment variables outside the schema
   * @param key
   * @param defaultValue
   * @returns
   */
  getRaw(key, defaultValue) {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }
    return this.envs[key] || defaultValue;
  }
  /**
   * @description - This function is used to get a value from the environment variables from the schema
   * @description - In order to retrieve an outside schema value, use the getRaw function
   * @param key
   * @param defaultValue
   * @returns
   */
  get(key, defaultValue, schema = this.schema) {
    if (!this.envs) {
      this.envs = this.collectEnvs();
    }
    const value = this.envs[key];
    if (value === void 0) {
      return defaultValue ?? schema.shape[key]._def.defaultValue();
    }
    const retrievedEnv = schema.shape[key];
    if (!retrievedEnv) {
      return value;
    }
    return retrievedEnv.parse(value);
  }
  collectEnvs() {
    const envFileHierarchy = this.envFileHierarchy;
    if (typeof envFileHierarchy === "string") {
      const envPath = `${this.rootPath}/${envFileHierarchy}`;
      if (!import_fs.default.existsSync(envPath) && !this.throwErrorOnValidationFail) {
        log(`Environment file not found: ${envPath}`, this.logs);
        return {};
      }
      if (!import_fs.default.existsSync(envPath)) {
        throw new Error(`Environment file not found: ${envPath}`);
      }
      return this.parseEnvFile(envPath);
    }
    for (const envFile of envFileHierarchy) {
      const envPath = `${this.rootPath}/${envFile}`;
      if (!import_fs.default.existsSync(envPath)) {
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
    const envFile = import_fs.default.readFileSync(envPath, "utf8");
    const envs = envFile.split("\n");
    const envsObject = {};
    const regex = /^(\S+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\[.*\]|\{.*\}|\S+))/;
    for (const env of envs) {
      if (env.trim().startsWith("#")) {
        continue;
      }
      const match = env.match(regex);
      if (!match) {
        continue;
      }
      const key = match[1];
      let value = match[2] || match[3] || match[4];
      if (value === void 0) {
        continue;
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
      envsObject[key] = value;
    }
    return envsObject;
  }
};

// src/index.ts
(async () => {
  const env = await EnvironmentManager.createEnvSchema(
    (z2) => {
      return z2.object({
        NODE_ENV: z2.enum(["development", "production"]),
        DATABASE_URL: z2.string().default("postgres://localhost:5432"),
        API_KEY: z2.string(),
        DEBUG: z2.boolean(),
        EMPTY_VALUE: z2.string(),
        QUOTED_EMPTY_VALUE: z2.string(),
        SINGLE_QUOTED_EMPTY_VALUE: z2.string(),
        SPACED_KEY: z2.string(),
        SPACED_KEY_WITH_QUOTES: z2.string(),
        SPECIAL_CHARS_IN_VALUE: z2.string(),
        TRAILING_SPACES: z2.string(),
        LIST_OF_VALUES_WITH_QUOTES: z2.array(z2.string()),
        LIST_OF_VALUES_WITH_SINGLE_QUOTES: z2.array(z2.string()),
        LIST_OF_VALUES_WITHOUT_QUOTES: z2.array(z2.string()),
        OBJECT: z2.object({ key: z2.string() })
      });
    },
    {
      logs: false,
      throwErrorOnValidationFail: false,
      rootPath: process.cwd(),
      envFileHierarchy: [".env"]
    }
  );
  console.log(env.getAll());
})();
var getInstance = EnvironmentManager.getInstance;
var createEnvSchema = EnvironmentManager.createEnvSchema;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createEnvSchema,
  getInstance
});
//# sourceMappingURL=index.js.map