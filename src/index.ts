import EnvironmentManager from './EnvironmentManager';
const createEnvSchema = EnvironmentManager.createEnvSchema;
const getInstance = EnvironmentManager.getInstance;

(async () => {
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

  // Retrieve a specific schema environment variable with a default value
  const schemaEnv = env.get('NODE_ENV', "development");

  // Retrieve searching on all the environment variables regardless of the schema
  const outsideEnv = env.getRaw('NON_SCHEMA_ENV');

  const schemaLessEnvManager = getInstance({
    rootPath: __dirname,
    envFileHierarchy: ['.env'],
  });

  // Retrieve all the environment variables
  const allEnvsSchemaLess = schemaLessEnvManager.getAll();

  // Retrieve a specific schema environment variable with a default value
  const schemaEnvSchemaLess = schemaLessEnvManager.get('NODE_ENV', "development");
})();

export { getInstance };
export default EnvironmentManager.createEnvSchema;
