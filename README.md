# Environment-manager
- Simple dotenv manager for node.js

## Create a Schema for you .env file
```typescript
import env from 'envitron';

env.createEnvSchema((schema) => {
  // Defines the hierarchy of the env files to be loaded, only the first file found will be loaded, default ['.env']
  // Also a single string with env file name can be set
  schema.envFileHierarchy = ['.env', '.env.local', '.env.development', '.env.production'];

  // A custom path for the env file can be set here, default path.resolve(__dirname)
  schema.envFilePath = './';

  // Enable debugging, default true
  schema.logs = true;

  // If set to true, an error will be thrown if an environment variable fails validation
  schema.throwErrorOnValidationFail = false; // default true

  return {
    NODE_ENV: schema.enum(['development', 'production', 'test', 'staging']),
    PORT: schema.number().range(80, 8080),
    API_URL: schema.string().mustBeUrl(),
    API_KEY: schema.string().optional(),
    LOGS: schema.boolean().optional(),
  };
});

const NODE_ENV = env.getEnv('NODE_ENV');
```

