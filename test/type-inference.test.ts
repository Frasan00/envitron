import fs from 'node:fs';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { createEnvSchema } from '../src';

describe('Type inference', () => {
  beforeEach(() => {
    if (fs.existsSync('.env.type-test.json')) fs.unlinkSync('.env.type-test.json');
  });

  afterAll(() => {
    if (fs.existsSync('.env.type-test.json')) fs.unlinkSync('.env.type-test.json');
  });

  describe('Nested objects', () => {
    it('should properly infer types for nested objects', () => {
      const jsonContent = {
        database: { host: 'localhost', port: 5432 },
      };

      fs.writeFileSync('.env.type-test.json', JSON.stringify(jsonContent, null, 2));

      const env = createEnvSchema(
        (schema) => ({
          database: schema.object({
            host: schema.string(),
            port: schema.number(),
          }),
        }),
        { envFile: '.env.type-test.json' }
      );

      const database = env.get('database');

      type DatabaseType = typeof database;
      type ExpectedDatabase = { host: string; port: number };

      const assertDatabase: DatabaseType extends ExpectedDatabase
        ? ExpectedDatabase extends DatabaseType
          ? true
          : false
        : false = true;

      expect(assertDatabase).toBe(true);
      expect(database.host).toBe('localhost');
      expect(database.port).toBe(5432);
    });

    it('should properly infer types for deeply nested objects', () => {
      const jsonContent = {
        services: {
          api: {
            endpoints: ['http://localhost:3000', 'http://localhost:4000'],
            port: 8080,
          },
        },
      };

      fs.writeFileSync('.env.type-test.json', JSON.stringify(jsonContent, null, 2));

      const env = createEnvSchema(
        (schema) => ({
          services: schema.object({
            api: schema.object({
              endpoints: schema.array(schema.string()),
              port: schema.number(),
            }),
          }),
        }),
        { envFile: '.env.type-test.json' }
      );

      const services = env.get('services');

      type ServicesType = typeof services;
      type ExpectedServices = {
        api: {
          endpoints: string[];
          port: number;
        };
      };

      const assertServices: ServicesType extends ExpectedServices
        ? ExpectedServices extends ServicesType
          ? true
          : false
        : false = true;

      expect(assertServices).toBe(true);
      expect(services.api.port).toBe(8080);
      expect(services.api.endpoints).toEqual(['http://localhost:3000', 'http://localhost:4000']);
    });
  });

  describe('Typed arrays', () => {
    it('should properly infer types for typed arrays', () => {
      const jsonContent = {
        ports: [3000, 4000, 5000],
      };

      fs.writeFileSync('.env.type-test.json', JSON.stringify(jsonContent, null, 2));

      const env = createEnvSchema(
        (schema) => ({
          ports: schema.array(schema.number()),
        }),
        { envFile: '.env.type-test.json' }
      );

      const ports = env.get('ports');

      type PortsType = typeof ports;
      type ExpectedPorts = number[];

      const assertPorts: PortsType extends ExpectedPorts
        ? ExpectedPorts extends PortsType
          ? true
          : false
        : false = true;

      expect(assertPorts).toBe(true);
      expect(ports).toEqual([3000, 4000, 5000]);
    });

    it('should properly infer types for string arrays', () => {
      const jsonContent = {
        tags: ['tag1', 'tag2', 'tag3'],
      };

      fs.writeFileSync('.env.type-test.json', JSON.stringify(jsonContent, null, 2));

      const env = createEnvSchema(
        (schema) => ({
          tags: schema.array(schema.string()),
        }),
        { envFile: '.env.type-test.json' }
      );

      const tags = env.get('tags');

      type TagsType = typeof tags;
      type ExpectedTags = string[];

      const assertTags: TagsType extends ExpectedTags
        ? ExpectedTags extends TagsType
          ? true
          : false
        : false = true;

      expect(assertTags).toBe(true);
      expect(tags).toEqual(['tag1', 'tag2', 'tag3']);
    });

    it('should properly infer types for boolean arrays', () => {
      const jsonContent = {
        flags: [true, false, true],
      };

      fs.writeFileSync('.env.type-test.json', JSON.stringify(jsonContent, null, 2));

      const env = createEnvSchema(
        (schema) => ({
          flags: schema.array(schema.boolean()),
        }),
        { envFile: '.env.type-test.json' }
      );

      const flags = env.get('flags');

      type FlagsType = typeof flags;
      type ExpectedFlags = boolean[];

      const assertFlags: FlagsType extends ExpectedFlags
        ? ExpectedFlags extends FlagsType
          ? true
          : false
        : false = true;

      expect(assertFlags).toBe(true);
      expect(flags).toEqual([true, false, true]);
    });
  });

  describe('Complex nested structures', () => {
    it('should properly infer types for objects with typed arrays', () => {
      const jsonContent = {
        config: {
          name: 'myapp',
          ports: [3000, 4000],
          enabled: true,
        },
      };

      fs.writeFileSync('.env.type-test.json', JSON.stringify(jsonContent, null, 2));

      const env = createEnvSchema(
        (schema) => ({
          config: schema.object({
            name: schema.string(),
            ports: schema.array(schema.number()),
            enabled: schema.boolean(),
          }),
        }),
        { envFile: '.env.type-test.json' }
      );

      const config = env.get('config');

      type ConfigType = typeof config;
      type ExpectedConfig = {
        name: string;
        ports: number[];
        enabled: boolean;
      };

      const assertConfig: ConfigType extends ExpectedConfig
        ? ExpectedConfig extends ConfigType
          ? true
          : false
        : false = true;

      expect(assertConfig).toBe(true);
      expect(config.name).toBe('myapp');
      expect(config.ports).toEqual([3000, 4000]);
      expect(config.enabled).toBe(true);
    });

    it('should properly infer types for arrays of objects', () => {
      const jsonContent = {
        users: [
          { name: 'Alice', age: 30 },
          { name: 'Bob', age: 25 },
        ],
      };

      fs.writeFileSync('.env.type-test.json', JSON.stringify(jsonContent, null, 2));

      const env = createEnvSchema(
        (schema) => ({
          users: schema.array(
            schema.object({
              name: schema.string(),
              age: schema.number(),
            })
          ),
        }),
        { envFile: '.env.type-test.json' }
      );

      const users = env.get('users');

      type UsersType = typeof users;
      type ExpectedUsers = Array<{ name: string; age: number }>;

      const assertUsers: UsersType extends ExpectedUsers
        ? ExpectedUsers extends UsersType
          ? true
          : false
        : false = true;

      expect(assertUsers).toBe(true);
      expect(users).toEqual([
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ]);
    });

    it('should properly infer types for deeply nested structures', () => {
      const jsonContent = {
        application: {
          name: 'myapp',
          version: '1.0.0',
          services: {
            api: {
              url: 'http://localhost:3000',
              timeout: 5000,
              retries: [1000, 2000, 3000],
            },
            cache: {
              enabled: true,
              ttl: 3600,
            },
          },
        },
      };

      fs.writeFileSync('.env.type-test.json', JSON.stringify(jsonContent, null, 2));

      const env = createEnvSchema(
        (schema) => ({
          application: schema.object({
            name: schema.string(),
            version: schema.string(),
            services: schema.object({
              api: schema.object({
                url: schema.string(),
                timeout: schema.number(),
                retries: schema.array(schema.number()),
              }),
              cache: schema.object({
                enabled: schema.boolean(),
                ttl: schema.number(),
              }),
            }),
          }),
        }),
        { envFile: '.env.type-test.json' }
      );

      const application = env.get('application');

      type ApplicationType = typeof application;
      type ExpectedApplication = {
        name: string;
        version: string;
        services: {
          api: {
            url: string;
            timeout: number;
            retries: number[];
          };
          cache: {
            enabled: boolean;
            ttl: number;
          };
        };
      };

      const assertApplication: ApplicationType extends ExpectedApplication
        ? ExpectedApplication extends ApplicationType
          ? true
          : false
        : false = true;

      expect(assertApplication).toBe(true);
      expect(application.name).toBe('myapp');
      expect(application.services.api.url).toBe('http://localhost:3000');
      expect(application.services.api.retries).toEqual([1000, 2000, 3000]);
      expect(application.services.cache.enabled).toBe(true);
    });
  });

  describe('Optional nested structures', () => {
    it('should properly infer types for optional nested objects', () => {
      const jsonContent = {
        optional_config: { host: 'localhost', port: 5432 },
      };

      fs.writeFileSync('.env.type-test.json', JSON.stringify(jsonContent, null, 2));

      const env = createEnvSchema(
        (schema) => ({
          optional_config: schema.object(
            {
              host: schema.string(),
              port: schema.number(),
            },
            { optional: true }
          ),
        }),
        { envFile: '.env.type-test.json' }
      );

      const optionalConfig = env.get('optional_config');

      type OptionalConfigType = typeof optionalConfig;
      type ExpectedOptionalConfig = { host: string; port: number } | undefined;

      const assertOptionalConfig: OptionalConfigType extends ExpectedOptionalConfig
        ? ExpectedOptionalConfig extends OptionalConfigType
          ? true
          : false
        : false = true;

      expect(assertOptionalConfig).toBe(true);
      expect(optionalConfig?.host).toBe('localhost');
      expect(optionalConfig?.port).toBe(5432);
    });

    it('should properly infer types for optional typed arrays', () => {
      const jsonContent = {
        optional_ports: [3000, 4000],
      };

      fs.writeFileSync('.env.type-test.json', JSON.stringify(jsonContent, null, 2));

      const env = createEnvSchema(
        (schema) => ({
          optional_ports: schema.array(schema.number(), { optional: true }),
        }),
        { envFile: '.env.type-test.json' }
      );

      const optionalPorts = env.get('optional_ports');

      type OptionalPortsType = typeof optionalPorts;
      type ExpectedOptionalPorts = number[] | undefined;

      const assertOptionalPorts: OptionalPortsType extends ExpectedOptionalPorts
        ? ExpectedOptionalPorts extends OptionalPortsType
          ? true
          : false
        : false = true;

      expect(assertOptionalPorts).toBe(true);
      expect(optionalPorts).toEqual([3000, 4000]);
    });
  });
});
