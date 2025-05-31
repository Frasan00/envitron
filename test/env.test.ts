import fs from 'node:fs';
import { createEnvSchema } from '../src/index';
import { describe, test, expect, beforeAll, afterAll } from 'vitest';

describe('EnvironmentManager (integration)', () => {
  beforeAll(() => {
    const envContent = fs.readFileSync('.env.example', 'utf-8');
    if (fs.existsSync('.env')) fs.unlinkSync('.env');
    fs.writeFileSync('.env', envContent);
  });

  afterAll(() => {
    if (fs.existsSync('.env')) fs.unlinkSync('.env');
  });

  // Initialize schema once for all tests
  const env = createEnvSchema(
    (schema) => ({
      'BOOLEAN': schema.boolean(),
      'EMPTY_BOOLEAN': schema.boolean({ optional: true }),
      'FLOAT': schema.number(),
      'NUMBER': schema.number(),
      'EMPTY_NUMBER': schema.number({ optional: true }),
      'QUOTED_NUMBER': schema.number(),
      'DEFAULT_ENUM': schema.enum(['test', 'test2'] as const, { optional: true }),
      'EMPTY_ENUM': schema.enum(['test', 'test2'] as const, { optional: true }),
      'DEFAULT_STRING': schema.string({ optional: true }),
      'DEFAULT_NUMBER': schema.number({ optional: true }),
      'DEFAULT_BOOLEAN': schema.boolean({ optional: true }),
      'FOO': schema.string(),
      // string edge cases
      'QUOTED1': schema.string(),
      'QUOTED2': schema.string(),
      'QUOTED3': schema.string(),
      'QUOTED4': schema.string(),
      'UNQUOTED_SPACES': schema.string(),
      'EMPTY': schema.string({ optional: true }),
      'ONLY_SPACES': schema.string({ optional: true }),
      'EQUALS': schema.string(),
      'HASH_VALUE': schema.string({ optional: true }),
      'DOT.KEY': schema.string(),
      'DASH-KEY': schema.string(),
      'UNDERSCORE_KEY': schema.string(),
      'KEY123': schema.string(),
      'MULTI_EQUALS': schema.string(),
      'TRAILING': schema.string(),
      'NOVALUE': schema.string({ optional: true }),
      'JUST_QUOTE': schema.string({ optional: true }),
      'JUST_DQUOTE': schema.string({ optional: true }),
      'JUST_HASH': schema.string({ optional: true }),
      'JUST_COMMA': schema.string({ optional: true }),
      'JUST_SPACE': schema.string({ optional: true }),
      'QUOTED_SPACE': schema.string(),
      'QUOTED_HASH': schema.string(),
      'QUOTED_COMMA': schema.string(),
      'QUOTED_EQUALS': schema.string(),
      'QUOTED_NEWLINE': schema.string(),
      'QUOTED_TAB': schema.string(),
      'ESCAPED_NEWLINE': schema.string(),
      'ESCAPED_TAB': schema.string(),
      'ESCAPED_BACKSLASH': schema.string(),
      'CSV': schema.array(),
      'CSV_QUOTED': schema.array(),
      'CSV_SINGLE_QUOTED': schema.array(),
      'ARRAY_DOUBLE_QUOTE': schema.array(),
      'ARRAY_SINGLE_QUOTE': schema.array(),
      'EMPTY_ARRAY': schema.array({ optional: true }),
      'CUSTOM': schema.custom((value) => Number(value) / 2),
    }),
    {
      envFile: '.env',
      rootPath: './lib',
    }
  );

  test('parses basic types and defaults', () => {
    expect(env.get('BOOLEAN')).toBe(true);
    expect(env.get('EMPTY_BOOLEAN')).toBeUndefined();
    expect(env.get('NUMBER')).toBe(123);
    expect(env.get('FLOAT')).toBe(12.142);
    expect(env.get('EMPTY_NUMBER')).toBeUndefined();
    expect(env.get('QUOTED_NUMBER')).toBe(123);
    expect(env.get('DEFAULT_ENUM', 'test2')).toBe('test2');
    expect(env.get('EMPTY_ENUM')).toBeUndefined();
    expect(env.get('DEFAULT_STRING', 'hello world')).toBe('hello world');
    expect(env.get('DEFAULT_NUMBER', 42)).toBe(42);
    expect(env.get('DEFAULT_BOOLEAN', false)).toBe(false);
    expect(env.get('FOO', 'bar')).toBe('bar');
  });

  test('handles string edge cases', () => {
    expect(env.get('JUST_QUOTE')).toBeUndefined();
    expect(env.get('JUST_DQUOTE')).toBeUndefined();
    expect(env.get('JUST_HASH')).toBeUndefined();
    expect(env.get('JUST_COMMA')).toBe(',');
    expect(env.get('JUST_SPACE')).toBeUndefined();
    expect(env.get('QUOTED_SPACE')).toBe(' ');
    expect(env.get('QUOTED_HASH')).toBe('#');
    expect(env.get('QUOTED_COMMA')).toBe(',');
    expect(env.get('QUOTED_EQUALS')).toBe('=');
    expect(env.get('QUOTED_NEWLINE')).toBe('\n');
    expect(env.get('QUOTED_TAB')).toBe('\t');
    expect(env.get('UNQUOTED_SPACES')).toBe('some value with spaces');
    expect(env.get('EMPTY')).toBeUndefined();
    expect(env.get('CUSTOM')).toBe(6);
  });

  test('parses arrays and optional array fallback', () => {
    expect(env.get('ARRAY_DOUBLE_QUOTE')).toEqual(['single', '123', 'double double', '1 mixed']);
    expect(env.get('ARRAY_SINGLE_QUOTE')).toEqual(['single', '123', 'double double', '1 mixed']);
    expect(env.get('CSV')).toEqual(['foo', 'bar', 'baz']);
    expect(env.get('CSV_QUOTED')).toEqual(['foo', 'bar', 'baz']);
    expect(env.get('CSV_SINGLE_QUOTED')).toEqual(['foo', 'bar', 'baz']);
    expect(env.get('EMPTY_ARRAY')).toBeUndefined();
    expect(env.get('EMPTY_ARRAY', ['fallback'])).toEqual(['fallback']);
  });

  test('get() with explicit defaults', () => {
    expect(env.get('NOVALUE', 'default')).toBe('default');
    expect(env.get('JUST_COMMA', 'default')).toBe(',');
    expect(env.get('QUOTED_COMMA', 'default')).toBe(',');
    expect(env.get('QUOTED_NEWLINE', 'default')).toBe('\n');
  });

  test('all() and set()', () => {
    const allEnvs = env.all();
    Object.keys(allEnvs).forEach((key) => {
      env.set(key, 'new value');
    });
    const updated = env.all();
    Object.values(updated).forEach((val) => {
      expect(val).toBe('new value');
    });
  });

  test('embedded environment variables', () => {
    expect(env.BOOLEAN).toBe(true);
    expect(env.EMPTY_BOOLEAN).toBeUndefined();
    expect(env.FLOAT).toBe(12.142);
    expect(env.NUMBER).toBe(123);
    expect(env.EMPTY_NUMBER).toBeUndefined();
    expect(env.QUOTED_NUMBER).toBe(123);
    expect(env.FOO).toBe('bar');
    expect(env.QUOTED1).toBe('double quoted');
    expect(env.QUOTED2).toBe('single quoted');
    expect(env.QUOTED3).toBe('with spaces and !@#$%^&*()');
    expect(env.UNQUOTED_SPACES).toBe('some value with spaces');
    expect(env.EMPTY).toBeUndefined();
    expect(env.ONLY_SPACES).toBeUndefined();
    expect(env.EQUALS).toBe('foo=bar=baz');
    expect(env.HASH_VALUE).toBeUndefined();
    expect(env['DOT.KEY']).toBe('dot');
    expect(env['DASH-KEY']).toBe('dash');
    expect(env['UNDERSCORE_KEY']).toBe('underscore');
    expect(env.KEY123).toBe('number');
    expect(env.CUSTOM).toBe(6);
  });
});
