# Environment-manager

- Simple environment manager for node.js

## How To Use

### Schema Based Env Manager
```typescript
import { createEnvSchema } from "envitron";

const env = await createEnvSchema(
  (vine) => {
    return vine.object({
      PORT: vine.number(),
      NODE_ENV: vine.string(),
    });
  },
  {
    rootPath: __dirname,
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

// Retrieve a specific schema environment variable with a default value
const nodeEnv = schemaLessEnvManager.get('NODE_ENV', "development");
```

