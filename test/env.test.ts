import fs from 'node:fs';
import { createEnvSchema } from '../src/index';
import logger from '../src/logger';

beforeAll(async () => {
  const envContent = fs.readFileSync('.env.example', 'utf-8');
  if (fs.existsSync('.env')) {
    fs.unlinkSync('.env');
  }

  fs.writeFileSync('.env', envContent);
});

afterAll(() => {
  if (fs.existsSync('.env')) {
    fs.unlinkSync('.env');
  }
});

test('env manager', async () => {
  const env = createEnvSchema((z) =>
    z.object({
      DEFAULT_ENUM: z.enum(['test', 'test2']).default('test'),
      DEFAULT_STRING: z.string().default('test'),
      DEFAULT_NUM: z.number().default(1),
      DEFAULT_BOOLEAN: z.boolean().default(false),
      NODE_ENV: z.string().optional(),
      COMMENTED_ENV: z.string().optional(),
      SEMI_COMMENTED_ENV: z.string().optional(),
      DATABASE_URL: z.string().optional(),
      API_KEY: z.string().optional(),
      DEBUG: z.boolean().optional(),
      EMPTY_VALUE: z.string().optional(),
      QUOTED_EMPTY_VALUE: z.string().optional(),
      SINGLE_QUOTED_EMPTY_VALUE: z.string().optional(),
      SPACED_KEY: z.string().optional(),
      SPACED_KEY_WITH_QUOTES: z.string().optional(),
      SPECIAL_CHARS_IN_VALUE: z.string().optional(),
      TRAILING_SPACES: z.string().optional(),
      LIST_OF_VALUES_WITH_QUOTES: z.array(z.union([z.string(), z.number()])).optional(),
      LIST_OF_VALUES_WITH_SINGLE_QUOTES: z.array(z.string()).optional(),
      LIST_OF_VALUES_WITHOUT_QUOTES: z.array(z.string()).optional(),
      OBJECT: z
        .object({
          key: z.string(),
        })
        .optional(),
    })
  );

  expect(env.get('NODE_ENV')).toBe('development');
  expect(env.get('DATABASE_URL')).toBe(' TESTTT ');
  expect(env.get('API_KEY')).toBe(' 12345 ');
  expect(env.get('DEBUG')).toBe(true);
  expect(env.get('EMPTY_VALUE')).toBe(undefined);
  expect(env.get('QUOTED_EMPTY_VALUE')).toBe('');
  expect(env.get('SINGLE_QUOTED_EMPTY_VALUE')).toBe('');
  expect(env.get('SPACED_KEY')).toBe('spaced_value');
  expect(env.get('SPACED_KEY_WITH_QUOTES')).toBe(' spaced_value ');
  expect(env.get('SPECIAL_CHARS_IN_VALUE')).toBe('!@#$%^&*()_+');
  expect(env.get('TRAILING_SPACES')).toBe('trailing_spaces');
  expect(env.get('LIST_OF_VALUES_WITH_QUOTES')).toEqual(['0', '1']);
  expect(env.get('LIST_OF_VALUES_WITH_SINGLE_QUOTES')).toEqual([' example', 'example']);
  expect(env.get('LIST_OF_VALUES_WITHOUT_QUOTES')).toEqual(['example', 'example']);
  expect(env.get('OBJECT')).toEqual({ key: 'value' });
  expect(env.get('COMMENTED_ENV')).toBe(undefined);
  expect(env.get('SEMI_COMMENTED_ENV')).toBe('sh');

  const allEnvs = env.getAll();
  logger.info(JSON.stringify(allEnvs, null, 2));
});

test('Single Instance', async () => {
  const env = createEnvSchema({ loadProcessEnv: true });

  expect(env.get('NODE_ENV')).toBe('development');
  expect(env.get('DATABASE_URL')).toBe(' TESTTT ');
  expect(env.get('API_KEY')).toBe(' 12345 ');
  expect(env.get('DEBUG')).toBe(true);
  expect(env.get('EMPTY_VALUE')).toBe(undefined);
  expect(env.get('QUOTED_EMPTY_VALUE')).toBe('');
  expect(env.get('SINGLE_QUOTED_EMPTY_VALUE')).toBe('');
  expect(env.get('SPACED_KEY')).toBe('spaced_value');
  expect(env.get('SPACED_KEY_WITH_QUOTES')).toBe(' spaced_value ');
  expect(env.get('SPECIAL_CHARS_IN_VALUE')).toBe('!@#$%^&*()_+');
  expect(env.get('TRAILING_SPACES')).toBe('trailing_spaces');
  expect(env.get('LIST_OF_VALUES_WITH_QUOTES')).toEqual(['0', '1']);
  expect(env.get('LIST_OF_VALUES_WITH_SINGLE_QUOTES')).toEqual([' example', 'example']);
  expect(env.get('LIST_OF_VALUES_WITHOUT_QUOTES')).toEqual(['example', 'example']);
  expect(env.get('OBJECT')).toEqual({ key: 'value' });
  expect(env.get('COMMENTED_ENV')).toBe(undefined);
  expect(env.get('SEMI_COMMENTED_ENV')).toBe('sh');
  expect(process.env.NODE_ENV).toBe('development');

  const allEnvs = env.getAll();
  logger.info(JSON.stringify(allEnvs, null, 2));
});
