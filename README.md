# Envitron

- Environment manager for Node.js
- Built on top of Zod for schema validation
- Chose Zod for its user-friendly API and excellent error messages. Although not the fastest, the performance impact is negligible since environment validation occurs only once at application startup.

## How To Use

### Schema Based Env Manager
```typescript
import { createEnvSchema } from "envitron";

const env = createEnvSchema(
  (z) => {
    return z.object({
      NODE_ENV: z.enum(["development", "production"]),
      DATABASE_URL: z.string().default('postgres://localhost:5432'),
      API_KEY: z.string(),
      DEBUG: z.boolean(),
      EMPTY_VALUE: z.string(),
      QUOTED_EMPTY_VALUE: z.string(),
      SINGLE_QUOTED_EMPTY_VALUE: z.string(),
      SPACED_KEY: z.string(),
      SPACED_KEY_WITH_QUOTES: z.string(),
      SPECIAL_CHARS_IN_VALUE: z.string(),
      TRAILING_SPACES: z.string(),
      LIST_OF_VALUES_WITH_QUOTES: z.array(z.string()),
      LIST_OF_VALUES_WITH_SINGLE_QUOTES: z.array(z.string()),
      LIST_OF_VALUES_WITHOUT_QUOTES: z.array(z.string()),
      OBJECT: z.object({ key: z.string() }),
    });
  },
  {
    logs: false,
    throwErrorOnValidationFail: false,
    rootPath: process.cwd(),
    envFileHierarchy: ['.env'],
  }
);

// Retrieve all the environment variables
const allEnvs = env.getAll();

// Retrieve a specific schema environment variable with a default value, the type will be inferred from the schema
const schemaBasedNodeEnv = env.get('NODE_ENV', "development");

// You can define a default value both in the get() method and in the zod schema (defaultValue in the get() method has the priority)
const databaseUrlWithSchemaDefault = env.get('DATABASE_URL'); // postgres://localhost:5432
const databaseUrlWithLocalDefault = env.get('DATABASE_URL', "postgres://12.12.12.12:5432"); // postgres://12.12.12.12:5432

// Retrieve searching on all the environment variables regardless of the schema
const outsideSchemaEnv = env.get('NON_SCHEMA_ENV');
```

### Schema Less Environment Manager
```typescript
import { getInstance } from "envitron";

const schemaLessEnvManager = getInstance({
  rootPath: __dirname,
  envFileHierarchy: ['.env'],
});

// Retrieve all the environment variables
const allEnvsSchemaLess = schemaLessEnvManager.getAll();

// Retrieve an env from the environment manager
const nodeEnv = schemaLessEnvManager.get('NODE_ENV', "development");
```

## Env Example

- To better understand the functionality of the env manager is an example of all handled use cases and resulting values
- !!! Envs must be defined in a single line regardless of their type !!!

```dotenv
NODE_ENV=development
COMMENTED_ENV= #should be undefined
SEMI_COMMENTED_ENV= sh #ould not be undefined
DATABASE_URL = " TESTTT "  # Spaces around the value
API_KEY=' 12345 '          # Spaces around the value with single quotes
DEBUG=true
EMPTY_VALUE=
QUOTED_EMPTY_VALUE=""
SINGLE_QUOTED_EMPTY_VALUE=''
SPACED_KEY = spaced_value    # Spaces around the key
SPACED_KEY_WITH_QUOTES = " spaced_value "  # Spaces around the key and value
SPECIAL_CHARS_IN_VALUE="!@#$%^&*()_+"
TRAILING_SPACES=trailing_spaces
LIST_OF_VALUES_WITH_QUOTES=['0', '1']
LIST_OF_VALUES_WITH_SINGLE_QUOTES=[' example', "example"]
LIST_OF_VALUES_WITHOUT_QUOTES=[example, example]
OBJECT={"key":"value"}
SINGLE_QUOTED_EMPTY_VALUE=''
```

- Will be parsed into:
```javascript
{
  NODE_ENV: 'development',
  SEMI_COMMENTED_ENV: 'sh',
  DATABASE_URL: ' TESTTT ',
  API_KEY: ' 12345 ',
  DEBUG: true,
  QUOTED_EMPTY_VALUE: '',
  SINGLE_QUOTED_EMPTY_VALUE: '',
  SPACED_KEY: 'spaced_value',
  SPACED_KEY_WITH_QUOTES: ' spaced_value ',
  SPECIAL_CHARS_IN_VALUE: '!@#$%^&*()_+',
  TRAILING_SPACES: 'trailing_spaces',
  LIST_OF_VALUES_WITH_QUOTES: [ '0', '1' ],
  LIST_OF_VALUES_WITH_SINGLE_QUOTES: [ ' example', 'example' ],
  LIST_OF_VALUES_WITHOUT_QUOTES: [ 'example', 'example' ],
  OBJECT: { key: 'value' }
}
```
