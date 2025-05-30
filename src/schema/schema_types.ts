export type EnvironmentString = string;
export type EnvironmentNumber = number;
export type EnvironmentBoolean = boolean;
export type EnvironmentEnum<T extends readonly string[]> = T[number];
export type EnvironmentArray<T> = T[];

export type EnvironmentSchemaTypes =
  | EnvironmentString
  | EnvironmentNumber
  | EnvironmentBoolean
  | EnvironmentEnum<any>
  | EnvironmentArray<string>;

export type InferType<T> = T extends EnvironmentString
  ? string
  : T extends EnvironmentNumber
    ? number
    : T extends EnvironmentBoolean
      ? boolean
      : T extends EnvironmentEnum<infer U>
        ? U[number]
        : T extends EnvironmentArray<infer U>
          ? U[]
          : T extends undefined
            ? undefined
            : never;

export type InferEnvCallbackType<T extends EnvValidationCallback<EnvironmentSchemaTypes>> =
  T extends EnvValidationCallback<infer U> ? U : never;

export type OptionalOption<O extends boolean> = {
  optional: O;
};

export type EnvironmentSchemaTypeOptions<O extends boolean> = OptionalOption<O>;

type RequiredAndMissingErrorPayload = {
  type: 'required_and_missing';
};

type WrongTypeErrorPayload = {
  type: 'wrong_type';
  foundType: string | undefined;
  expectedType: string;
  foundValue: string | undefined;
};

/**
 * @description - A function that validates the environment variable, used to validate the environment variable before it is set
 * @internal
 */
export type EnvValidationCallback<T extends EnvironmentSchemaTypes> = (value: string) => {
  value: InferType<T> | undefined;
  error?: RequiredAndMissingErrorPayload | WrongTypeErrorPayload;
};
