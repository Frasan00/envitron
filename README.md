# Environment-manager

- Simple environment manager for node.js

## How To Use

### Schema Based Env Manager
```typescript
import { createEnvSchema } from "envitron";

const env = await createEnvSchema(
  (vine) => {
    return vine.object({
      NODE_ENV: vine.enum(["development", "production"]),
      DATABASE_URL: vine.string(),
      API_KEY: vine.string(),
      DEBUG: vine.boolean(),
      EMPTY_VALUE: vine.string(),
      QUOTED_EMPTY_VALUE: vine.string(),
      SINGLE_QUOTED_EMPTY_VALUE: vine.string(),
      SPACED_KEY: vine.string(),
      SPACED_KEY_WITH_QUOTES: vine.string(),
      SPECIAL_CHARS_IN_VALUE: vine.string(),
      TRAILING_SPACES: vine.string(),
      LIST_OF_VALUES_WITH_QUOTES: vine.array(vine.string()),
      LIST_OF_VALUES_WITH_SINGLE_QUOTES: vine.array(vine.string()),
      LIST_OF_VALUES_WITHOUT_QUOTES: vine.array(vine.string()),
      OBJECT: vine.object({ key: vine.string() }),
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

// Retrieve searching on all the environment variables regardless of the schema
const outsideSchemaEnv = env.getRaw('NON_SCHEMA_ENV');
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
// NUMBERS
PORT=80

// STRINGS 
NODE_ENV=development
DATABASE_URL = " Example "
API_KEY=' 12345 '
DEBUG=true
QUOTED_EMPTY_VALUE=""
SINGLE_QUOTED_EMPTY_VALUE=''
SPACED_KEY = spaced_value
SPACED_KEY_WITH_QUOTES = " spaced_value "
SPECIAL_CHARS_IN_VALUE="!@#$%^&*()_+"
TRAILING_SPACES=trailing_spaces

// EMPTY
EMPTY_VALUE=

// LISTS (must be defined in square brackets with values separated by commas)
LIST_OF_VALUES_WITH_QUOTES=[" example", "example "]
LIST_OF_VALUES_WITH_SINGLE_QUOTES=[' example', "example"]
LIST_OF_VALUES_WITHOUT_QUOTES=[example, example]

// OBJECTS (NOT ADVISED, must be able to pass a JSON.parse call)
OBJECT={"key":"value"}
```

- Will be parsed into:
```any
{
  PORT: '80',
  NODE_ENV: 'development',
  DATABASE_URL: ' Example ',
  API_KEY: ' 12345 ',
  DEBUG: 'true',
  QUOTED_EMPTY_VALUE: undefined,
  SINGLE_QUOTED_EMPTY_VALUE: undefined,
  SPACED_KEY: 'spaced_value',
  SPACED_KEY_WITH_QUOTES: ' spaced_value ',
  SPECIAL_CHARS_IN_VALUE: '!@#$%^&*()_+',
  TRAILING_SPACES: 'trailing_spaces',
  LIST_OF_VALUES_WITH_QUOTES: [ ' example', 'example ' ],
  LIST_OF_VALUES_WITH_SINGLE_QUOTES: [ ' example', 'example' ],
  LIST_OF_VALUES_WITHOUT_QUOTES: [ 'example', 'example' ],
  OBJECT: { key: 'value' }
}
```

## Known issues

- optional arrays and objects counted as any while inferring type from the schema with getEnv();