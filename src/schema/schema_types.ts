export type EnvironmentString = string;
export type EnvironmentNumber = number;
export type EnvironmentBoolean = boolean;
export type EnvironmentEnum<T extends readonly string[]> = T;
export type EnvironmentArray = string[];
export type EnvironmentTypedArray<T> = Array<T>;
export type EnvironmentObject<T> = T;
export type EnvironmentCustom<T> = T;

export type StringOptions =
  | {
      format?: 'email' | 'url' | 'ip' | 'uuid' | 'host';
      minLength?: number;
      maxLength?: number;
    }
  | {
      format?: 'regex';
      regex: RegExp;
      minLength?: number;
      maxLength?: number;
    };

export type NumberOptions = {
  min?: number;
  max?: number;
  positive?: boolean;
};

export type EnvironmentSchemaTypes =
  | EnvironmentString
  | EnvironmentNumber
  | EnvironmentBoolean
  | EnvironmentEnum<any>
  | EnvironmentArray
  | EnvironmentTypedArray<any>
  | EnvironmentObject<any>
  | EnvironmentCustom<any>;

export type InferType<T> =
  T extends EnvironmentObject<infer U>
    ? U extends Record<string, EnvValidationCallback<any>>
      ? { [K in keyof U]: InferEnvCallbackType<U[K]> }
      : U
    : T extends EnvironmentTypedArray<infer U>
      ? U extends EnvValidationCallback<any>
        ? Array<InferEnvCallbackType<U>>
        : Array<U>
      : T extends EnvironmentArray
        ? string[]
        : T extends EnvironmentString
          ? string
          : T extends EnvironmentNumber
            ? number
            : T extends EnvironmentBoolean
              ? boolean
              : T extends EnvironmentEnum<infer U>
                ? U[number]
                : T extends undefined
                  ? undefined
                  : T extends EnvironmentCustom<infer U>
                    ? U
                    : never;

export type InferEnvCallbackType<T extends EnvValidationCallback<EnvironmentSchemaTypes>> =
  T extends EnvValidationCallback<infer U> ? InferType<U> : never;

export type OptionalOption<O extends boolean> = {
  optional?: O;
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
export type EnvValidationCallback<T extends EnvironmentSchemaTypes> = (value: any) => {
  value: InferType<T>;
  error?: RequiredAndMissingErrorPayload | WrongTypeErrorPayload;
};
