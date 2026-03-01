import fs from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { createEnvSchema } from '../src/index';

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

  const a = env.get('EMPTY', 'test');

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

describe('String validations', () => {
  beforeEach(() => {
    if (fs.existsSync('.env.validation')) fs.unlinkSync('.env.validation');
  });

  afterAll(() => {
    if (fs.existsSync('.env.validation')) fs.unlinkSync('.env.validation');
  });

  test('validates email format', () => {
    fs.writeFileSync('.env.validation', 'EMAIL=test@example.com\nINVALID_EMAIL=notanemail');

    const env = createEnvSchema(
      (schema) => ({
        EMAIL: schema.string({ format: 'email' }),
        INVALID_EMAIL: schema.string({ format: 'email' }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('EMAIL')).toBe('test@example.com');
    expect(env.get('INVALID_EMAIL')).toBeUndefined();
  });

  test('validates url format', () => {
    fs.writeFileSync(
      '.env.validation',
      'URL=https://example.com\nURL2=http://test.org/path\nINVALID_URL=notaurl'
    );

    const env = createEnvSchema(
      (schema) => ({
        URL: schema.string({ format: 'url' }),
        URL2: schema.string({ format: 'url' }),
        INVALID_URL: schema.string({ format: 'url' }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('URL')).toBe('https://example.com');
    expect(env.get('URL2')).toBe('http://test.org/path');
    expect(env.get('INVALID_URL')).toBeUndefined();
  });

  test('validates ip format', () => {
    fs.writeFileSync('.env.validation', 'IP=192.168.1.1\nINVALID_IP=999.999.999.999');

    const env = createEnvSchema(
      (schema) => ({
        IP: schema.string({ format: 'ip' }),
        INVALID_IP: schema.string({ format: 'ip' }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('IP')).toBe('192.168.1.1');
    expect(env.get('INVALID_IP')).toBeUndefined();
  });

  test('validates uuid format', () => {
    fs.writeFileSync(
      '.env.validation',
      'UUID=550e8400-e29b-41d4-a716-446655440000\nINVALID_UUID=not-a-uuid'
    );

    const env = createEnvSchema(
      (schema) => ({
        UUID: schema.string({ format: 'uuid' }),
        INVALID_UUID: schema.string({ format: 'uuid' }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('UUID')).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(env.get('INVALID_UUID')).toBeUndefined();
  });

  test('validates host format', () => {
    fs.writeFileSync(
      '.env.validation',
      'HOST=example.com\nHOST2=sub.example.com\nINVALID_HOST=not a host!'
    );

    const env = createEnvSchema(
      (schema) => ({
        HOST: schema.string({ format: 'host' }),
        HOST2: schema.string({ format: 'host' }),
        INVALID_HOST: schema.string({ format: 'host' }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('HOST')).toBe('example.com');
    expect(env.get('HOST2')).toBe('sub.example.com');
    expect(env.get('INVALID_HOST')).toBeUndefined();
  });

  test('validates regex format', () => {
    fs.writeFileSync('.env.validation', 'CODE=ABC123\nINVALID_CODE=xyz789');

    const env = createEnvSchema(
      (schema) => ({
        CODE: schema.string({ format: 'regex', regex: /^[A-Z]{3}[0-9]{3}$/ }),
        INVALID_CODE: schema.string({ format: 'regex', regex: /^[A-Z]{3}[0-9]{3}$/ }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('CODE')).toBe('ABC123');
    expect(env.get('INVALID_CODE')).toBeUndefined();
  });

  test('validates optional strings with format', () => {
    fs.writeFileSync('.env.validation', 'OPTIONAL_EMAIL=test@example.com\nMISSING_EMAIL=');

    const env = createEnvSchema(
      (schema) => ({
        OPTIONAL_EMAIL: schema.string({ format: 'email', optional: true }),
        MISSING_EMAIL: schema.string({ format: 'email', optional: true }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('OPTIONAL_EMAIL')).toBe('test@example.com');
    expect(env.get('MISSING_EMAIL')).toBeUndefined();
  });
});

describe('Number validations', () => {
  beforeEach(() => {
    if (fs.existsSync('.env.validation')) fs.unlinkSync('.env.validation');
  });

  afterAll(() => {
    if (fs.existsSync('.env.validation')) fs.unlinkSync('.env.validation');
  });

  test('validates min constraint', () => {
    fs.writeFileSync('.env.validation', 'VALID_MIN=10\nINVALID_MIN=5');

    const env = createEnvSchema(
      (schema) => ({
        VALID_MIN: schema.number({ min: 10 }),
        INVALID_MIN: schema.number({ min: 10 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_MIN')).toBe(10);
    expect(env.get('INVALID_MIN')).toBeUndefined();
  });

  test('validates max constraint', () => {
    fs.writeFileSync('.env.validation', 'VALID_MAX=50\nINVALID_MAX=150');

    const env = createEnvSchema(
      (schema) => ({
        VALID_MAX: schema.number({ max: 100 }),
        INVALID_MAX: schema.number({ max: 100 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_MAX')).toBe(50);
    expect(env.get('INVALID_MAX')).toBeUndefined();
  });

  test('validates min and max constraints', () => {
    fs.writeFileSync('.env.validation', 'VALID_RANGE=50\nTOO_LOW=5\nTOO_HIGH=150');

    const env = createEnvSchema(
      (schema) => ({
        VALID_RANGE: schema.number({ min: 10, max: 100 }),
        TOO_LOW: schema.number({ min: 10, max: 100 }),
        TOO_HIGH: schema.number({ min: 10, max: 100 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_RANGE')).toBe(50);
    expect(env.get('TOO_LOW')).toBeUndefined();
    expect(env.get('TOO_HIGH')).toBeUndefined();
  });

  test('validates positive constraint', () => {
    fs.writeFileSync('.env.validation', 'VALID_POSITIVE=10\nINVALID_POSITIVE=-5\nZERO=0');

    const env = createEnvSchema(
      (schema) => ({
        VALID_POSITIVE: schema.number({ positive: true }),
        INVALID_POSITIVE: schema.number({ positive: true }),
        ZERO: schema.number({ positive: true }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_POSITIVE')).toBe(10);
    expect(env.get('INVALID_POSITIVE')).toBeUndefined();
    expect(env.get('ZERO')).toBeUndefined();
  });

  test('validates float numbers with constraints', () => {
    fs.writeFileSync('.env.validation', 'VALID_FLOAT=12.5\nINVALID_FLOAT=2.3');

    const env = createEnvSchema(
      (schema) => ({
        VALID_FLOAT: schema.number({ min: 10.0, max: 20.0 }),
        INVALID_FLOAT: schema.number({ min: 10.0, max: 20.0 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_FLOAT')).toBe(12.5);
    expect(env.get('INVALID_FLOAT')).toBeUndefined();
  });

  test('validates optional numbers with constraints', () => {
    fs.writeFileSync('.env.validation', 'OPTIONAL_NUMBER=50\nMISSING_NUMBER=');

    const env = createEnvSchema(
      (schema) => ({
        OPTIONAL_NUMBER: schema.number({ min: 10, max: 100, optional: true }),
        MISSING_NUMBER: schema.number({ min: 10, max: 100, optional: true }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('OPTIONAL_NUMBER')).toBe(50);
    expect(env.get('MISSING_NUMBER')).toBeUndefined();
  });

  test('validates zero with min constraint', () => {
    fs.writeFileSync('.env.validation', 'ZERO=0\nNEGATIVE=-1');

    const env = createEnvSchema(
      (schema) => ({
        ZERO: schema.number({ min: 0 }),
        NEGATIVE: schema.number({ min: 0 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('ZERO')).toBe(0);
    expect(env.get('NEGATIVE')).toBeUndefined();
  });

  test('validates boundary values', () => {
    fs.writeFileSync('.env.validation', 'MIN_BOUNDARY=10\nMAX_BOUNDARY=100');

    const env = createEnvSchema(
      (schema) => ({
        MIN_BOUNDARY: schema.number({ min: 10, max: 100 }),
        MAX_BOUNDARY: schema.number({ min: 10, max: 100 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('MIN_BOUNDARY')).toBe(10);
    expect(env.get('MAX_BOUNDARY')).toBe(100);
  });

  test('combined positive and min constraints', () => {
    fs.writeFileSync('.env.validation', 'VALID_POSITIVE_MIN=50\nZERO_POSITIVE=0');

    const env = createEnvSchema(
      (schema) => ({
        VALID_POSITIVE_MIN: schema.number({ positive: true, min: 10 }),
        ZERO_POSITIVE: schema.number({ positive: true, min: 10 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_POSITIVE_MIN')).toBe(50);
    expect(env.get('ZERO_POSITIVE')).toBeUndefined();
  });

  test('negative numbers with various constraints', () => {
    fs.writeFileSync('.env.validation', 'NEG_IN_RANGE=-50\nNEG_BELOW_MIN=-150\nNEG_WITH_POS=-10');

    const env = createEnvSchema(
      (schema) => ({
        NEG_IN_RANGE: schema.number({ min: -100, max: -10 }),
        NEG_BELOW_MIN: schema.number({ min: -100, max: -10 }),
        NEG_WITH_POS: schema.number({ positive: true }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('NEG_IN_RANGE')).toBe(-50);
    expect(env.get('NEG_BELOW_MIN')).toBeUndefined();
    expect(env.get('NEG_WITH_POS')).toBeUndefined();
  });

  test('very large and very small numbers', () => {
    fs.writeFileSync('.env.validation', 'LARGE=999999999\nSMALL=0.0001\nVERY_LARGE=1000000000');

    const env = createEnvSchema(
      (schema) => ({
        LARGE: schema.number({ max: 999999999 }),
        SMALL: schema.number({ min: 0.0001 }),
        VERY_LARGE: schema.number({ max: 999999999 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('LARGE')).toBe(999999999);
    expect(env.get('SMALL')).toBe(0.0001);
    expect(env.get('VERY_LARGE')).toBeUndefined();
  });

  test('decimal precision edge cases', () => {
    fs.writeFileSync('.env.validation', 'DECIMAL1=0.1\nDECIMAL2=1.999\nDECIMAL3=10.5');

    const env = createEnvSchema(
      (schema) => ({
        DECIMAL1: schema.number({ min: 0.1, max: 0.1 }),
        DECIMAL2: schema.number({ max: 1.999 }),
        DECIMAL3: schema.number({ min: 10.5, max: 10.5 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('DECIMAL1')).toBe(0.1);
    expect(env.get('DECIMAL2')).toBe(1.999);
    expect(env.get('DECIMAL3')).toBe(10.5);
  });

  test('multiple constraint failures', () => {
    fs.writeFileSync('.env.validation', 'FAIL_MULTI=-5\nFAIL_ALL=-100');

    const env = createEnvSchema(
      (schema) => ({
        FAIL_MULTI: schema.number({ min: 10, max: 100, positive: true }),
        FAIL_ALL: schema.number({ min: 0, positive: true }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('FAIL_MULTI')).toBeUndefined();
    expect(env.get('FAIL_ALL')).toBeUndefined();
  });
});

describe('String validation edge cases', () => {
  beforeEach(() => {
    if (fs.existsSync('.env.validation')) fs.unlinkSync('.env.validation');
  });

  afterAll(() => {
    if (fs.existsSync('.env.validation')) fs.unlinkSync('.env.validation');
  });

  test('minLength constraint', () => {
    fs.writeFileSync('.env.validation', 'VALID_MIN=hello\nTOO_SHORT=hi\nEXACT=abc\nEMPTY_MIN=');

    const env = createEnvSchema(
      (schema) => ({
        VALID_MIN: schema.string({ minLength: 3 }),
        TOO_SHORT: schema.string({ minLength: 3 }),
        EXACT: schema.string({ minLength: 3 }),
        EMPTY_MIN: schema.string({ minLength: 1, optional: true }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_MIN')).toBe('hello');
    expect(env.get('TOO_SHORT')).toBeUndefined();
    expect(env.get('EXACT')).toBe('abc');
    expect(env.get('EMPTY_MIN')).toBeUndefined();
  });

  test('maxLength constraint', () => {
    fs.writeFileSync('.env.validation', 'VALID_MAX=hi\nTOO_LONG=hello\nEXACT_MAX=abc');

    const env = createEnvSchema(
      (schema) => ({
        VALID_MAX: schema.string({ maxLength: 5 }),
        TOO_LONG: schema.string({ maxLength: 3 }),
        EXACT_MAX: schema.string({ maxLength: 3 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_MAX')).toBe('hi');
    expect(env.get('TOO_LONG')).toBeUndefined();
    expect(env.get('EXACT_MAX')).toBe('abc');
  });

  test('combined minLength and maxLength', () => {
    fs.writeFileSync(
      '.env.validation',
      'VALID_RANGE=hello\nTOO_SHORT_RANGE=hi\nTOO_LONG_RANGE=verylongstring'
    );

    const env = createEnvSchema(
      (schema) => ({
        VALID_RANGE: schema.string({ minLength: 3, maxLength: 10 }),
        TOO_SHORT_RANGE: schema.string({ minLength: 3, maxLength: 10 }),
        TOO_LONG_RANGE: schema.string({ minLength: 3, maxLength: 10 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_RANGE')).toBe('hello');
    expect(env.get('TOO_SHORT_RANGE')).toBeUndefined();
    expect(env.get('TOO_LONG_RANGE')).toBeUndefined();
  });

  test('format with length constraints', () => {
    fs.writeFileSync(
      '.env.validation',
      'VALID_EMAIL_LENGTH=test@example.com\nSHORT_EMAIL=a@b.c\nLONG_EMAIL=verylongemailaddress@verylongdomainname.com'
    );

    const env = createEnvSchema(
      (schema) => ({
        VALID_EMAIL_LENGTH: schema.string({ format: 'email', minLength: 5, maxLength: 50 }),
        SHORT_EMAIL: schema.string({ format: 'email', minLength: 10 }),
        LONG_EMAIL: schema.string({ format: 'email', maxLength: 30 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_EMAIL_LENGTH')).toBe('test@example.com');
    expect(env.get('SHORT_EMAIL')).toBeUndefined();
    expect(env.get('LONG_EMAIL')).toBeUndefined();
  });

  test('email format edge cases', () => {
    fs.writeFileSync(
      '.env.validation',
      'VALID_EMAIL1=user@domain.com\nVALID_EMAIL2=user.name+tag@example.co.uk\nINVALID_NO_AT=userdomain.com\nINVALID_NO_DOMAIN=user@\nINVALID_NO_TLD=user@domain\nINVALID_SPACES=user @domain.com'
    );

    const env = createEnvSchema(
      (schema) => ({
        VALID_EMAIL1: schema.string({ format: 'email' }),
        VALID_EMAIL2: schema.string({ format: 'email' }),
        INVALID_NO_AT: schema.string({ format: 'email' }),
        INVALID_NO_DOMAIN: schema.string({ format: 'email' }),
        INVALID_NO_TLD: schema.string({ format: 'email' }),
        INVALID_SPACES: schema.string({ format: 'email' }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_EMAIL1')).toBe('user@domain.com');
    expect(env.get('VALID_EMAIL2')).toBe('user.name+tag@example.co.uk');
    expect(env.get('INVALID_NO_AT')).toBeUndefined();
    expect(env.get('INVALID_NO_DOMAIN')).toBeUndefined();
    expect(env.get('INVALID_NO_TLD')).toBeUndefined();
    expect(env.get('INVALID_SPACES')).toBeUndefined();
  });

  test('url format edge cases', () => {
    fs.writeFileSync(
      '.env.validation',
      'VALID_URL1=https://example.com\nVALID_URL2=http://sub.example.com/path\nVALID_URL3=example.com\nINVALID_URL_SPACE=http://exa mple.com\nINVALID_URL_SPECIAL=http://[example].com'
    );

    const env = createEnvSchema(
      (schema) => ({
        VALID_URL1: schema.string({ format: 'url' }),
        VALID_URL2: schema.string({ format: 'url' }),
        VALID_URL3: schema.string({ format: 'url' }),
        INVALID_URL_SPACE: schema.string({ format: 'url' }),
        INVALID_URL_SPECIAL: schema.string({ format: 'url' }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_URL1')).toBe('https://example.com');
    expect(env.get('VALID_URL2')).toBe('http://sub.example.com/path');
    expect(env.get('VALID_URL3')).toBe('example.com');
    expect(env.get('INVALID_URL_SPACE')).toBeUndefined();
    expect(env.get('INVALID_URL_SPECIAL')).toBeUndefined();
  });

  test('ip format edge cases', () => {
    fs.writeFileSync(
      '.env.validation',
      'VALID_IP1=192.168.1.1\nVALID_IP2=0.0.0.0\nVALID_IP3=255.255.255.255\nINVALID_IP_HIGH=256.256.256.256\nINVALID_IP_FORMAT=192.168.1\nINVALID_IP_ALPHA=192.168.1.a'
    );

    const env = createEnvSchema(
      (schema) => ({
        VALID_IP1: schema.string({ format: 'ip' }),
        VALID_IP2: schema.string({ format: 'ip' }),
        VALID_IP3: schema.string({ format: 'ip' }),
        INVALID_IP_HIGH: schema.string({ format: 'ip' }),
        INVALID_IP_FORMAT: schema.string({ format: 'ip' }),
        INVALID_IP_ALPHA: schema.string({ format: 'ip' }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_IP1')).toBe('192.168.1.1');
    expect(env.get('VALID_IP2')).toBe('0.0.0.0');
    expect(env.get('VALID_IP3')).toBe('255.255.255.255');
    expect(env.get('INVALID_IP_HIGH')).toBeUndefined();
    expect(env.get('INVALID_IP_FORMAT')).toBeUndefined();
    expect(env.get('INVALID_IP_ALPHA')).toBeUndefined();
  });

  test('uuid format edge cases', () => {
    fs.writeFileSync(
      '.env.validation',
      'VALID_UUID1=550e8400-e29b-41d4-a716-446655440000\nVALID_UUID2=6ba7b810-9dad-11d1-80b4-00c04fd430c8\nINVALID_UUID_SHORT=550e8400-e29b-41d4-a716\nINVALID_UUID_CHAR=550e8400-e29b-41d4-a716-44665544000g\nINVALID_UUID_NO_DASH=550e8400e29b41d4a716446655440000'
    );

    const env = createEnvSchema(
      (schema) => ({
        VALID_UUID1: schema.string({ format: 'uuid' }),
        VALID_UUID2: schema.string({ format: 'uuid' }),
        INVALID_UUID_SHORT: schema.string({ format: 'uuid' }),
        INVALID_UUID_CHAR: schema.string({ format: 'uuid' }),
        INVALID_UUID_NO_DASH: schema.string({ format: 'uuid' }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_UUID1')).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(env.get('VALID_UUID2')).toBe('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    expect(env.get('INVALID_UUID_SHORT')).toBeUndefined();
    expect(env.get('INVALID_UUID_CHAR')).toBeUndefined();
    expect(env.get('INVALID_UUID_NO_DASH')).toBeUndefined();
  });

  test('host format edge cases', () => {
    fs.writeFileSync(
      '.env.validation',
      'VALID_HOST1=example.com\nVALID_HOST2=sub.example.com\nVALID_HOST3=my-domain.com\nINVALID_HOST_SPACE=my domain.com\nINVALID_HOST_SPECIAL=my@domain.com\nINVALID_HOST_SLASH=example.com/path'
    );

    const env = createEnvSchema(
      (schema) => ({
        VALID_HOST1: schema.string({ format: 'host' }),
        VALID_HOST2: schema.string({ format: 'host' }),
        VALID_HOST3: schema.string({ format: 'host' }),
        INVALID_HOST_SPACE: schema.string({ format: 'host' }),
        INVALID_HOST_SPECIAL: schema.string({ format: 'host' }),
        INVALID_HOST_SLASH: schema.string({ format: 'host' }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_HOST1')).toBe('example.com');
    expect(env.get('VALID_HOST2')).toBe('sub.example.com');
    expect(env.get('VALID_HOST3')).toBe('my-domain.com');
    expect(env.get('INVALID_HOST_SPACE')).toBeUndefined();
    expect(env.get('INVALID_HOST_SPECIAL')).toBeUndefined();
    expect(env.get('INVALID_HOST_SLASH')).toBeUndefined();
  });

  test('regex format complex patterns', () => {
    fs.writeFileSync(
      '.env.validation',
      'VALID_PHONE=+1-555-123-4567\nINVALID_PHONE=555-1234\nVALID_HEX="#FF5733"\nINVALID_HEX="#GG5733"\nVALID_VERSION=1.2.3\nINVALID_VERSION=1.2'
    );

    const env = createEnvSchema(
      (schema) => ({
        VALID_PHONE: schema.string({ format: 'regex', regex: /^\+\d{1}-\d{3}-\d{3}-\d{4}$/ }),
        INVALID_PHONE: schema.string({ format: 'regex', regex: /^\+\d{1}-\d{3}-\d{3}-\d{4}$/ }),
        VALID_HEX: schema.string({ format: 'regex', regex: /^#[0-9A-F]{6}$/i }),
        INVALID_HEX: schema.string({ format: 'regex', regex: /^#[0-9A-F]{6}$/i }),
        VALID_VERSION: schema.string({ format: 'regex', regex: /^\d+\.\d+\.\d+$/ }),
        INVALID_VERSION: schema.string({ format: 'regex', regex: /^\d+\.\d+\.\d+$/ }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_PHONE')).toBe('+1-555-123-4567');
    expect(env.get('INVALID_PHONE')).toBeUndefined();
    expect(env.get('VALID_HEX')).toBe('#FF5733');
    expect(env.get('INVALID_HEX')).toBeUndefined();
    expect(env.get('VALID_VERSION')).toBe('1.2.3');
    expect(env.get('INVALID_VERSION')).toBeUndefined();
  });

  test('zero length constraints', () => {
    fs.writeFileSync('.env.validation', 'EMPTY_ALLOWED=\nNOT_EMPTY=test');

    const env = createEnvSchema(
      (schema) => ({
        EMPTY_ALLOWED: schema.string({ minLength: 0, optional: true }),
        NOT_EMPTY: schema.string({ minLength: 0 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('EMPTY_ALLOWED')).toBeUndefined();
    expect(env.get('NOT_EMPTY')).toBe('test');
  });

  test('very long strings', () => {
    const longString = 'a'.repeat(1000);
    const veryLongString = 'b'.repeat(10000);

    fs.writeFileSync('.env.validation', `LONG_VALID=${longString}\nLONG_INVALID=${veryLongString}`);

    const env = createEnvSchema(
      (schema) => ({
        LONG_VALID: schema.string({ maxLength: 1000 }),
        LONG_INVALID: schema.string({ maxLength: 5000 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('LONG_VALID')).toBe(longString);
    expect(env.get('LONG_INVALID')).toBeUndefined();
  });

  test('special characters and unicode', () => {
    fs.writeFileSync(
      '.env.validation',
      'UNICODE=こんにちは\nEMOJI=🎉🎊\nSPECIAL="!@$%^&*()"\nSPECIAL_WITH_HASH="#special"'
    );

    const env = createEnvSchema(
      (schema) => ({
        UNICODE: schema.string({ minLength: 3, maxLength: 10 }),
        EMOJI: schema.string({ minLength: 2 }),
        SPECIAL: schema.string({ minLength: 5 }),
        SPECIAL_WITH_HASH: schema.string({ minLength: 5 }),
      }),
      { envFile: '.env.validation', throwErrorOnValidationFail: false }
    );

    expect(env.get('UNICODE')).toBe('こんにちは');
    expect(env.get('EMOJI')).toBe('🎉🎊');
    expect(env.get('SPECIAL')).toBe('!@$%^&*()');
    expect(env.get('SPECIAL_WITH_HASH')).toBe('#special');
  });
});

describe('JSON environment files', () => {
  beforeEach(() => {
    if (fs.existsSync('.env.json')) fs.unlinkSync('.env.json');
  });

  afterAll(() => {
    if (fs.existsSync('.env.json')) fs.unlinkSync('.env.json');
  });

  test('parses valid flat JSON with native types', () => {
    const jsonContent = {
      PORT: 3000,
      DEBUG: true,
      API_KEY: 'secret123',
      HOST: 'localhost',
      ENABLED: false,
      TIMEOUT: 5000,
    };

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        PORT: schema.number(),
        DEBUG: schema.boolean(),
        API_KEY: schema.string(),
        HOST: schema.string(),
        ENABLED: schema.boolean(),
        TIMEOUT: schema.number(),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('PORT')).toBe(3000);
    expect(env.get('DEBUG')).toBe(true);
    expect(env.get('API_KEY')).toBe('secret123');
    expect(env.get('HOST')).toBe('localhost');
    expect(env.get('ENABLED')).toBe(false);
    expect(env.get('TIMEOUT')).toBe(5000);
  });

  test('handles type mismatch when nested object passed to non-object schema', () => {
    const jsonContent = {
      DATABASE: {
        HOST: 'localhost',
        PORT: 5432,
      },
    };

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        DATABASE: schema.string(),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('DATABASE')).toBeUndefined();
  });

  test('rejects JSON arrays', () => {
    const jsonContent = ['value1', 'value2', 'value3'];

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    expect(() => {
      createEnvSchema(
        (schema) => ({
          VALUE: schema.string(),
        }),
        { envFile: '.env.json', throwErrorOnValidationFail: true }
      );
    }).toThrow('[Envitron] JSON must be an object');
  });

  test('rejects JSON primitives', () => {
    fs.writeFileSync('.env.json', '"just a string"');

    expect(() => {
      createEnvSchema(
        (schema) => ({
          VALUE: schema.string(),
        }),
        { envFile: '.env.json', throwErrorOnValidationFail: true }
      );
    }).toThrow('[Envitron] JSON must be an object');
  });

  test('handles JSON with undefined and null values', () => {
    const jsonContent = {
      DEFINED: 'value',
      NULLABLE: null,
      OPTIONAL_STRING: 'test',
    };

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        DEFINED: schema.string(),
        NULLABLE: schema.string({ optional: true }),
        OPTIONAL_STRING: schema.string({ optional: true }),
        MISSING: schema.string({ optional: true }),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('DEFINED')).toBe('value');
    expect(env.get('NULLABLE')).toBeUndefined();
    expect(env.get('OPTIONAL_STRING')).toBe('test');
    expect(env.get('MISSING')).toBeUndefined();
  });

  test('validates JSON numbers with constraints', () => {
    const jsonContent = {
      VALID_PORT: 8080,
      INVALID_PORT: 99999,
      POSITIVE_NUM: 42,
      NEGATIVE_NUM: -10,
      FLOAT_NUM: 3.14,
    };

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        VALID_PORT: schema.number({ min: 1024, max: 65535 }),
        INVALID_PORT: schema.number({ min: 1024, max: 65535 }),
        POSITIVE_NUM: schema.number({ positive: true }),
        NEGATIVE_NUM: schema.number({ positive: true }),
        FLOAT_NUM: schema.number({ min: 3.0, max: 4.0 }),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_PORT')).toBe(8080);
    expect(env.get('INVALID_PORT')).toBeUndefined();
    expect(env.get('POSITIVE_NUM')).toBe(42);
    expect(env.get('NEGATIVE_NUM')).toBeUndefined();
    expect(env.get('FLOAT_NUM')).toBe(3.14);
  });

  test('validates JSON strings with format constraints', () => {
    const jsonContent = {
      EMAIL: 'test@example.com',
      INVALID_EMAIL: 'notanemail',
      URL: 'https://example.com',
      UUID: '550e8400-e29b-41d4-a716-446655440000',
    };

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        EMAIL: schema.string({ format: 'email' }),
        INVALID_EMAIL: schema.string({ format: 'email' }),
        URL: schema.string({ format: 'url' }),
        UUID: schema.string({ format: 'uuid' }),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('EMAIL')).toBe('test@example.com');
    expect(env.get('INVALID_EMAIL')).toBeUndefined();
    expect(env.get('URL')).toBe('https://example.com');
    expect(env.get('UUID')).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  test('handles JSON arrays stored as comma-separated strings', () => {
    const jsonContent = {
      CSV_STRING: 'foo,bar,baz',
      EMPTY_CSV: '',
    };

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        CSV_STRING: schema.array(),
        EMPTY_CSV: schema.array({ optional: true }),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('CSV_STRING')).toEqual(['foo', 'bar', 'baz']);
    expect(env.get('EMPTY_CSV')).toBeUndefined();
  });

  test('validates JSON enums', () => {
    const jsonContent = {
      VALID_ENV: 'production',
      INVALID_ENV: 'invalid',
      OPTIONAL_ENV: 'development',
    };

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        VALID_ENV: schema.enum(['development', 'production', 'test'] as const),
        INVALID_ENV: schema.enum(['development', 'production', 'test'] as const),
        OPTIONAL_ENV: schema.enum(['development', 'production', 'test'] as const, {
          optional: true,
        }),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('VALID_ENV')).toBe('production');
    expect(env.get('INVALID_ENV')).toBe('invalid');
    expect(env.get('OPTIONAL_ENV')).toBe('development');
  });

  test('custom validators with JSON native types', () => {
    const jsonContent = {
      DOUBLE_ME: 50,
      MULTIPLY: 10,
    };

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        DOUBLE_ME: schema.custom((value) => Number(value) * 2),
        MULTIPLY: schema.custom((value) => Number(value) * 3),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('DOUBLE_ME')).toBe(100);
    expect(env.get('MULTIPLY')).toBe(30);
  });

  test('mixed file types - .env and .json', () => {
    fs.writeFileSync('.env', 'STRING_VAR=from_env\nNUMBER_VAR=999');
    fs.writeFileSync('.env.json', JSON.stringify({ JSON_VAR: 'from_json', JSON_NUM: 123 }));

    const env = createEnvSchema(
      (schema) => ({
        STRING_VAR: schema.string(),
        NUMBER_VAR: schema.number(),
        JSON_VAR: schema.string(),
        JSON_NUM: schema.number(),
      }),
      { envFile: ['.env', '.env.json'], throwErrorOnValidationFail: false }
    );

    expect(env.get('STRING_VAR')).toBe('from_env');
    expect(env.get('NUMBER_VAR')).toBe(999);
    expect(env.get('JSON_VAR')).toBe('from_json');
    expect(env.get('JSON_NUM')).toBe(123);
  });

  test('JSON overrides .env when both define same key', () => {
    fs.writeFileSync('.env', 'SHARED_KEY=from_env\nONLY_ENV=env_value');
    fs.writeFileSync(
      '.env.json',
      JSON.stringify({ SHARED_KEY: 'from_json', ONLY_JSON: 'json_value' })
    );

    const env = createEnvSchema(
      (schema) => ({
        SHARED_KEY: schema.string(),
        ONLY_ENV: schema.string(),
        ONLY_JSON: schema.string(),
      }),
      { envFile: ['.env', '.env.json'], throwErrorOnValidationFail: false }
    );

    expect(env.get('SHARED_KEY')).toBe('from_json');
    expect(env.get('ONLY_ENV')).toBe('env_value');
    expect(env.get('ONLY_JSON')).toBe('json_value');
  });

  test('malformed JSON throws for .json files', () => {
    fs.writeFileSync('.env.json', 'NOT_JSON=this_is_env_format\nANOTHER=value');

    expect(() => {
      createEnvSchema(
        (schema) => ({
          NOT_JSON: schema.string(),
          ANOTHER: schema.string(),
        }),
        { envFile: '.env.json', throwErrorOnValidationFail: false }
      );
    }).toThrow('[Envitron] Failed to parse JSON file');
  });

  test('invalid JSON with trailing comma throws a descriptive error', () => {
    fs.writeFileSync(
      '.env.json',
      `{
  "port": 80,
  "host": "0.0.0.0",
  "logs": true,
  "aws": {
    "accessKeyId": "test",
    "secretAccessKey": "test",
    "region": "test",
  },
  "allowedDomains": ["test1", "test2"]
}`
    );

    expect(() => {
      createEnvSchema(
        (schema) => ({
          port: schema.number({ optional: true }),
          host: schema.string({ optional: true }),
          logs: schema.boolean({ optional: true }),
          aws: schema.object(
            {
              accessKeyId: schema.string(),
              secretAccessKey: schema.string(),
              region: schema.string(),
            },
            { optional: true }
          ),
          allowedDomains: schema.array(schema.string(), { optional: true }),
        }),
        { envFile: '.env.json', loadFromProcessEnv: false }
      );
    }).toThrow('[Envitron] Failed to parse JSON file');
  });

  test('empty JSON object', () => {
    fs.writeFileSync('.env.json', '{}');

    const env = createEnvSchema(
      (schema) => ({
        OPTIONAL_VAR: schema.string({ optional: true }),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('OPTIONAL_VAR')).toBeUndefined();
  });

  test('JSON with whitespace and formatting', () => {
    const jsonContent = `
    {
      "KEY1": "value1",
      "KEY2": 42,
      "KEY3": true
    }
    `;

    fs.writeFileSync('.env.json', jsonContent);

    const env = createEnvSchema(
      (schema) => ({
        KEY1: schema.string(),
        KEY2: schema.number(),
        KEY3: schema.boolean(),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('KEY1')).toBe('value1');
    expect(env.get('KEY2')).toBe(42);
    expect(env.get('KEY3')).toBe(true);
  });

  test('JSON with empty strings and zero values', () => {
    const jsonContent = {
      EMPTY_STRING: '',
      ZERO: 0,
      FALSE_BOOL: false,
    };

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        EMPTY_STRING: schema.string({ optional: true }),
        ZERO: schema.number({ min: 0 }),
        FALSE_BOOL: schema.boolean(),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('EMPTY_STRING')).toBeUndefined();
    expect(env.get('ZERO')).toBe(0);
    expect(env.get('FALSE_BOOL')).toBe(false);
  });

  test('JSON with special characters in string values', () => {
    const jsonContent = {
      WITH_QUOTES: 'He said "hello"',
      WITH_NEWLINE: 'line1\nline2',
      WITH_BACKSLASH: 'path\\to\\file',
      WITH_UNICODE: '🚀 emoji test',
    };

    fs.writeFileSync('.env.json', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        WITH_QUOTES: schema.string(),
        WITH_NEWLINE: schema.string(),
        WITH_BACKSLASH: schema.string(),
        WITH_UNICODE: schema.string(),
      }),
      { envFile: '.env.json', throwErrorOnValidationFail: false }
    );

    expect(env.get('WITH_QUOTES')).toBe('He said "hello"');
    expect(env.get('WITH_NEWLINE')).toBe('line1\nline2');
    expect(env.get('WITH_BACKSLASH')).toBe('path\\to\\file');
    expect(env.get('WITH_UNICODE')).toBe('🚀 emoji test');
  });
});

describe('Nested JSON objects', () => {
  beforeEach(() => {
    if (fs.existsSync('.env.nested')) fs.unlinkSync('.env.nested');
  });

  afterAll(() => {
    if (fs.existsSync('.env.nested')) fs.unlinkSync('.env.nested');
  });

  test('validates basic nested objects', () => {
    const jsonContent = {
      database: {
        host: 'localhost',
        port: 5432,
        ssl: true,
      },
    };

    fs.writeFileSync('.env.nested', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        database: schema.object({
          host: schema.string(),
          port: schema.number(),
          ssl: schema.boolean(),
        }),
      }),
      { envFile: '.env.nested', throwErrorOnValidationFail: false }
    );

    const db = env.get('database');
    expect(db).toBeDefined();
    expect(db.host).toBe('localhost');
    expect(db.port).toBe(5432);
    expect(db.ssl).toBe(true);
  });

  test('validates deeply nested objects', () => {
    const jsonContent = {
      app: {
        server: {
          config: {
            timeout: 30,
            retries: 3,
          },
          port: 8080,
        },
        name: 'api',
      },
    };

    fs.writeFileSync('.env.nested', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        app: schema.object({
          server: schema.object({
            config: schema.object({
              timeout: schema.number(),
              retries: schema.number(),
            }),
            port: schema.number(),
          }),
          name: schema.string(),
        }),
      }),
      { envFile: '.env.nested', throwErrorOnValidationFail: false }
    );

    const app = env.get('app');
    expect(app).toBeDefined();
    expect(app.server.config.timeout).toBe(30);
    expect(app.server.config.retries).toBe(3);
    expect(app.server.port).toBe(8080);
    expect(app.name).toBe('api');
  });

  test('validates optional nested objects', () => {
    const jsonContent = {
      required: {
        value: 'test',
      },
    };

    fs.writeFileSync('.env.nested', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        required: schema.object({
          value: schema.string(),
        }),
        optional: schema.object(
          {
            value: schema.string(),
          },
          { optional: true }
        ),
      }),
      { envFile: '.env.nested', throwErrorOnValidationFail: false }
    );

    expect(env.get('required')).toEqual({ value: 'test' });
    expect(env.get('optional')).toBeUndefined();
  });

  test('validates nested objects with mixed types', () => {
    const jsonContent = {
      service: {
        name: 'api',
        port: 3000,
        enabled: true,
        timeout: 30.5,
        tags: 'prod,api',
      },
    };

    fs.writeFileSync('.env.nested', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        service: schema.object({
          name: schema.string(),
          port: schema.number({ min: 1024, max: 65535 }),
          enabled: schema.boolean(),
          timeout: schema.number(),
          tags: schema.array(),
        }),
      }),
      { envFile: '.env.nested', throwErrorOnValidationFail: false }
    );

    const service = env.get('service');
    expect(service.name).toBe('api');
    expect(service.port).toBe(3000);
    expect(service.enabled).toBe(true);
    expect(service.timeout).toBe(30.5);
    expect(service.tags).toEqual(['prod', 'api']);
  });

  test('handles nested object validation failures', () => {
    const jsonContent = {
      config: {
        port: 99999,
        name: 'te',
      },
    };

    fs.writeFileSync('.env.nested', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        config: schema.object({
          port: schema.number({ min: 1024, max: 65535 }),
          name: schema.string({ minLength: 3 }),
        }),
      }),
      { envFile: '.env.nested', throwErrorOnValidationFail: false }
    );

    const config = env.get('config');
    expect(config.port).toBeUndefined();
    expect(config.name).toBeUndefined();
  });

  test('rejects non-object values for object schema', () => {
    const jsonContent = {
      database: 'not an object',
    };

    fs.writeFileSync('.env.nested', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        database: schema.object({
          host: schema.string(),
        }),
      }),
      { envFile: '.env.nested', throwErrorOnValidationFail: false }
    );

    expect(env.get('database')).toBeUndefined();
  });

  test('rejects arrays for object schema', () => {
    const jsonContent = {
      database: ['item1', 'item2'],
    };

    fs.writeFileSync('.env.nested', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        database: schema.object({
          host: schema.string(),
        }),
      }),
      { envFile: '.env.nested', throwErrorOnValidationFail: false }
    );

    expect(env.get('database')).toBeUndefined();
  });
});

describe('Typed arrays', () => {
  beforeEach(() => {
    if (fs.existsSync('.env.array')) fs.unlinkSync('.env.array');
  });

  afterAll(() => {
    if (fs.existsSync('.env.array')) fs.unlinkSync('.env.array');
  });

  test('validates arrays of numbers', () => {
    const jsonContent = {
      ports: [8080, 8081, 8082],
      scores: [10, 20, 30, 40],
    };

    fs.writeFileSync('.env.array', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        ports: schema.array(schema.number()),
        scores: schema.array(schema.number()),
      }),
      { envFile: '.env.array', throwErrorOnValidationFail: false }
    );

    expect(env.get('ports')).toEqual([8080, 8081, 8082]);
    expect(env.get('scores')).toEqual([10, 20, 30, 40]);
  });

  test('validates arrays of strings', () => {
    const jsonContent = {
      tags: ['prod', 'api', 'v1'],
      names: ['alice', 'bob', 'charlie'],
    };

    fs.writeFileSync('.env.array', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        tags: schema.array(schema.string()),
        names: schema.array(schema.string()),
      }),
      { envFile: '.env.array', throwErrorOnValidationFail: false }
    );

    expect(env.get('tags')).toEqual(['prod', 'api', 'v1']);
    expect(env.get('names')).toEqual(['alice', 'bob', 'charlie']);
  });

  test('validates arrays of booleans', () => {
    const jsonContent = {
      flags: [true, false, true, true],
    };

    fs.writeFileSync('.env.array', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        flags: schema.array(schema.boolean()),
      }),
      { envFile: '.env.array', throwErrorOnValidationFail: false }
    );

    expect(env.get('flags')).toEqual([true, false, true, true]);
  });

  test('validates typed arrays with constraints', () => {
    const jsonContent = {
      validPorts: [1024, 8080, 3000],
      invalidPorts: [80, 100000, 3000],
    };

    fs.writeFileSync('.env.array', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        validPorts: schema.array(schema.number({ min: 1024, max: 65535 })),
        invalidPorts: schema.array(schema.number({ min: 1024, max: 65535 })),
      }),
      { envFile: '.env.array', throwErrorOnValidationFail: false }
    );

    expect(env.get('validPorts')).toEqual([1024, 8080, 3000]);
    expect(env.get('invalidPorts')).toEqual([undefined, undefined, 3000]);
  });

  test('validates optional typed arrays', () => {
    const jsonContent = {
      present: [1, 2, 3],
    };

    fs.writeFileSync('.env.array', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        present: schema.array(schema.number(), { optional: true }),
        missing: schema.array(schema.number(), { optional: true }),
      }),
      { envFile: '.env.array', throwErrorOnValidationFail: false }
    );

    expect(env.get('present')).toEqual([1, 2, 3]);
    expect(env.get('missing')).toBeUndefined();
  });

  test('validates empty typed arrays', () => {
    const jsonContent = {
      emptyNumbers: [],
      emptyStrings: [],
    };

    fs.writeFileSync('.env.array', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        emptyNumbers: schema.array(schema.number()),
        emptyStrings: schema.array(schema.string()),
      }),
      { envFile: '.env.array', throwErrorOnValidationFail: false }
    );

    expect(env.get('emptyNumbers')).toEqual([]);
    expect(env.get('emptyStrings')).toEqual([]);
  });

  test('typed arrays work with comma-separated strings from .env', () => {
    fs.writeFileSync('.env.array', 'PORTS=8080,8081,8082\nTAGS=prod,api,v1');

    const env = createEnvSchema(
      (schema) => ({
        PORTS: schema.array(schema.number()),
        TAGS: schema.array(schema.string()),
      }),
      { envFile: '.env.array', throwErrorOnValidationFail: false }
    );

    expect(env.get('PORTS')).toEqual([8080, 8081, 8082]);
    expect(env.get('TAGS')).toEqual(['prod', 'api', 'v1']);
  });

  test('backward compatibility - untyped arrays still work', () => {
    const jsonContent = {
      tags: ['a', 'b', 'c'],
    };

    fs.writeFileSync('.env.array', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        tags: schema.array(),
      }),
      { envFile: '.env.array', throwErrorOnValidationFail: false }
    );

    expect(env.get('tags')).toEqual(['a', 'b', 'c']);
  });
});

describe('Complex nested structures', () => {
  beforeEach(() => {
    if (fs.existsSync('.env.complex')) fs.unlinkSync('.env.complex');
  });

  afterAll(() => {
    if (fs.existsSync('.env.complex')) fs.unlinkSync('.env.complex');
  });

  test('validates nested objects with arrays', () => {
    const jsonContent = {
      services: {
        api: {
          endpoints: ['users', 'posts', 'comments'],
          port: 3000,
          enabled: true,
        },
        worker: {
          endpoints: ['jobs', 'tasks'],
          port: 3001,
          enabled: false,
        },
      },
    };

    fs.writeFileSync('.env.complex', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        services: schema.object({
          api: schema.object({
            endpoints: schema.array(schema.string()),
            port: schema.number(),
            enabled: schema.boolean(),
          }),
          worker: schema.object({
            endpoints: schema.array(schema.string()),
            port: schema.number(),
            enabled: schema.boolean(),
          }),
        }),
      }),
      { envFile: '.env.complex', throwErrorOnValidationFail: false }
    );

    const services = env.get('services');
    expect(services.api.endpoints).toEqual(['users', 'posts', 'comments']);
    expect(services.api.port).toBe(3000);
    expect(services.api.enabled).toBe(true);
    expect(services.worker.endpoints).toEqual(['jobs', 'tasks']);
    expect(services.worker.port).toBe(3001);
    expect(services.worker.enabled).toBe(false);
  });

  test('validates arrays of numbers with nested objects', () => {
    const jsonContent = {
      config: {
        allowedPorts: [8080, 8081, 8082],
        blockedPorts: [80, 443],
      },
      metadata: {
        version: '1.0.0',
      },
    };

    fs.writeFileSync('.env.complex', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        config: schema.object({
          allowedPorts: schema.array(schema.number({ min: 1024 })),
          blockedPorts: schema.array(schema.number()),
        }),
        metadata: schema.object({
          version: schema.string(),
        }),
      }),
      { envFile: '.env.complex', throwErrorOnValidationFail: false }
    );

    const config = env.get('config');
    expect(config.allowedPorts).toEqual([8080, 8081, 8082]);
    expect(config.blockedPorts).toEqual([80, 443]);
    expect(env.get('metadata').version).toBe('1.0.0');
  });

  test('validates complex structure with all types', () => {
    const jsonContent = {
      application: {
        name: 'myapp',
        version: '2.0.0',
        settings: {
          debug: false,
          timeout: 5000,
          features: ['auth', 'api', 'websocket'],
          limits: {
            maxConnections: 100,
            rateLimit: 1000,
          },
        },
      },
    };

    fs.writeFileSync('.env.complex', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        application: schema.object({
          name: schema.string(),
          version: schema.string(),
          settings: schema.object({
            debug: schema.boolean(),
            timeout: schema.number(),
            features: schema.array(schema.string()),
            limits: schema.object({
              maxConnections: schema.number({ positive: true }),
              rateLimit: schema.number({ positive: true }),
            }),
          }),
        }),
      }),
      { envFile: '.env.complex', throwErrorOnValidationFail: false }
    );

    const app = env.get('application');
    expect(app.name).toBe('myapp');
    expect(app.version).toBe('2.0.0');
    expect(app.settings.debug).toBe(false);
    expect(app.settings.timeout).toBe(5000);
    expect(app.settings.features).toEqual(['auth', 'api', 'websocket']);
    expect(app.settings.limits.maxConnections).toBe(100);
    expect(app.settings.limits.rateLimit).toBe(1000);
  });

  test('validates nested objects with optional fields', () => {
    const jsonContent = {
      database: {
        host: 'localhost',
        port: 5432,
      },
    };

    fs.writeFileSync('.env.complex', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        database: schema.object({
          host: schema.string(),
          port: schema.number(),
          username: schema.string({ optional: true }),
          password: schema.string({ optional: true }),
        }),
      }),
      { envFile: '.env.complex', throwErrorOnValidationFail: false }
    );

    const db = env.get('database');
    expect(db.host).toBe('localhost');
    expect(db.port).toBe(5432);
    expect(db.username).toBeUndefined();
    expect(db.password).toBeUndefined();
  });

  test('validates arrays of enums', () => {
    const jsonContent = {
      environments: ['development', 'production', 'test'],
    };

    fs.writeFileSync('.env.complex', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        environments: schema.array(
          schema.enum(['development', 'production', 'test', 'staging'] as const)
        ),
      }),
      { envFile: '.env.complex', throwErrorOnValidationFail: false }
    );

    expect(env.get('environments')).toEqual(['development', 'production', 'test']);
  });

  test('validates nested objects with string format constraints', () => {
    const jsonContent = {
      api: {
        endpoint: 'https://api.example.com',
        apiKey: '550e8400-e29b-41d4-a716-446655440000',
        email: 'admin@example.com',
      },
    };

    fs.writeFileSync('.env.complex', JSON.stringify(jsonContent, null, 2));

    const env = createEnvSchema(
      (schema) => ({
        api: schema.object({
          endpoint: schema.string({ format: 'url' }),
          apiKey: schema.string({ format: 'uuid' }),
          email: schema.string({ format: 'email' }),
        }),
      }),
      { envFile: '.env.complex', throwErrorOnValidationFail: false }
    );

    const api = env.get('api');
    expect(api.endpoint).toBe('https://api.example.com');
    expect(api.apiKey).toBe('550e8400-e29b-41d4-a716-446655440000');
    expect(api.email).toBe('admin@example.com');
  });
});
