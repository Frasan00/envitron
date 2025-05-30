export class EnvitronError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class WrongTypeError extends EnvitronError {
  constructor(key: string, value: any, expectedType: string, gotType: string) {
    super(`[EnvitronError] ${key} Expected type ${expectedType}, "${value}" is of type ${gotType}`);
  }
}

export class MissingRequiredEnvError extends EnvitronError {
  constructor(envName: string) {
    super(`[EnvitronError] Missing required environment variable: "${envName}"`);
  }
}
