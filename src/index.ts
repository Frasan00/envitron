import EnvironmentManager from './environment_manager';

export const getInstance = EnvironmentManager.getInstance;
export const createEnvSchema = EnvironmentManager.createEnvSchema;

export default {
  getInstance,
  createEnvSchema,
};
