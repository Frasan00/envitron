import {
  EnvironmentArray,
  EnvironmentBoolean,
  EnvironmentCustom,
  EnvironmentEnum,
  EnvironmentNumber,
  EnvironmentSchemaTypeOptions,
  EnvironmentString,
  EnvValidationCallback,
  InferType,
} from './schema_types';

export class Schema {
  private readonly onlyDigitsAndFloatRegex = /^[0-9]+(\.[0-9]+)?$/;
  private readonly booleanRegex = /^true|false$/i;

  /**
   * @description - A function that validates a string environment variable
   * @description - Environment variables are required by default, unless the `optional` option is set to true
   * @param options - An object that contains the options for the environment variable
   * @returns A function that validates a string environment variable
   */
  string<O extends boolean = false>(
    options?: EnvironmentSchemaTypeOptions<O>
  ): EnvValidationCallback<O extends true ? EnvironmentString | undefined : EnvironmentString> {
    return (value) => {
      if (this.nonExistingValue(value)) {
        return {
          value: undefined as InferType<
            O extends true ? EnvironmentString | undefined : EnvironmentString
          >,
          error: this.isRequired(options) ? { type: 'required_and_missing' } : undefined,
        };
      }

      return {
        value: value as InferType<
          O extends true ? EnvironmentString | undefined : EnvironmentString
        >,
      };
    };
  }

  /**
   * @description - A function that validates a number environment variable
   * @description - Environment variables are required by default, unless the `optional` option is set to true
   * @param options - An object that contains the options for the environment variable
   * @returns A function that validates a number environment variable
   */
  number<O extends boolean = false>(
    options?: EnvironmentSchemaTypeOptions<O>
  ): EnvValidationCallback<O extends true ? EnvironmentNumber | undefined : EnvironmentNumber> {
    return (value: string | undefined) => {
      if (this.nonExistingValue(value)) {
        return {
          value: undefined as InferType<
            O extends true ? EnvironmentNumber | undefined : EnvironmentNumber
          >,
          error: this.isRequired(options) ? { type: 'required_and_missing' } : undefined,
        };
      }

      if (typeof value === 'number') {
        return {
          value: value as InferType<
            O extends true ? EnvironmentNumber | undefined : EnvironmentNumber
          >,
        };
      }

      if (!this.onlyDigitsAndFloatRegex.test(value as string)) {
        return {
          value: undefined as unknown as InferType<
            O extends true ? EnvironmentNumber | undefined : EnvironmentNumber
          >,
          error: {
            type: 'wrong_type',
            foundType: typeof value,
            expectedType: 'number',
            foundValue: value,
          },
        };
      }

      const finalValue = value?.includes('.')
        ? Number.parseFloat(value as string)
        : Number.parseInt(value as string);

      return {
        value: finalValue as InferType<
          O extends true ? EnvironmentNumber | undefined : EnvironmentNumber
        >,
      };
    };
  }

  /**
   * @description - A function that validates a boolean environment variable
   * @description - Environment variables are required by default, unless the `optional` option is set to true
   * @param options - An object that contains the options for the environment variable
   * @returns A function that validates a boolean environment variable
   */
  boolean<O extends boolean = false>(
    options?: EnvironmentSchemaTypeOptions<O>
  ): EnvValidationCallback<O extends true ? EnvironmentBoolean | undefined : EnvironmentBoolean> {
    return (value: string | undefined) => {
      if (this.nonExistingValue(value)) {
        return {
          value: undefined as InferType<
            O extends true ? EnvironmentBoolean | undefined : EnvironmentBoolean
          >,
          error: this.isRequired(options) ? { type: 'required_and_missing' } : undefined,
        };
      }

      if (typeof value === 'boolean') {
        return {
          value: value as InferType<
            O extends true ? EnvironmentBoolean | undefined : EnvironmentBoolean
          >,
        };
      }

      if (!this.booleanRegex.test(value as string)) {
        return {
          value: undefined as unknown as InferType<
            O extends true ? EnvironmentBoolean | undefined : EnvironmentBoolean
          >,
          error: {
            type: 'wrong_type',
            foundType: typeof value,
            expectedType: 'boolean',
            foundValue: value,
          },
        };
      }

      const finalValue = value?.toLowerCase() === 'true';
      return {
        value: finalValue as InferType<
          O extends true ? EnvironmentBoolean | undefined : EnvironmentBoolean
        >,
      };
    };
  }

  /**
   * @description - A function that validates an enum environment variable
   * @description - Environment variables are required by default, unless the `optional` option is set to true
   * @param enumValues - An array of strings that contains the values of the enum
   * @param options - An object that contains the options for the environment variable
   * @returns A function that validates an enum environment variable
   */
  enum<T extends readonly string[], O extends boolean = false>(
    enumValues: T,
    options?: EnvironmentSchemaTypeOptions<O>
  ): EnvValidationCallback<O extends true ? EnvironmentEnum<T> | undefined : EnvironmentEnum<T>> {
    return (value: string) => {
      if (this.nonExistingValue(value)) {
        return {
          value: undefined as InferType<EnvironmentEnum<T>>,
          error: this.isRequired(options) ? { type: 'required_and_missing' } : undefined,
        };
      }

      if (typeof value === 'string' && !enumValues.includes(value)) {
        return {
          value: value as InferType<EnvironmentEnum<T>>,
        };
      }

      if (!enumValues.includes(value as string)) {
        return {
          value: value as InferType<EnvironmentEnum<T>>,
          error: {
            type: 'wrong_type',
            foundType: typeof value,
            expectedType: enumValues.join(', '),
            foundValue: value,
          },
        };
      }

      const finalValue = value as InferType<EnvironmentEnum<T>>;
      return {
        value: finalValue,
      };
    };
  }

  /**
   * @description - A function that validates an array environment variable
   * @description - Environment variables are required by default, unless the `optional` option is set to true
   * @param options - An object that contains the options for the environment variable
   * @returns A function that validates an array environment variable
   */
  array<T = string, O extends boolean = false>(
    options?: EnvironmentSchemaTypeOptions<O>
  ): EnvValidationCallback<O extends true ? EnvironmentArray | undefined : EnvironmentArray> {
    return (value: string | undefined) => {
      if (this.nonExistingValue(value)) {
        return {
          value: undefined as InferType<
            O extends true ? EnvironmentArray | undefined : EnvironmentArray
          >,
          error: this.isRequired(options) ? { type: 'required_and_missing' } : undefined,
        };
      }

      if (Array.isArray(value)) {
        return {
          value: value as InferType<
            O extends true ? EnvironmentArray | undefined : EnvironmentArray
          >,
        };
      }

      const parsedValue = value?.split(',').map((v) => v.trim()) as T[];
      if (!Array.isArray(parsedValue)) {
        return {
          value: undefined as InferType<
            O extends true ? EnvironmentArray | undefined : EnvironmentArray
          >,
          error: {
            type: 'wrong_type',
            foundType: typeof value,
            expectedType: 'array',
            foundValue: value,
          },
        };
      }

      const finalValue = parsedValue as EnvironmentArray;
      return {
        value: finalValue as InferType<
          O extends true ? EnvironmentArray | undefined : EnvironmentArray
        >,
      };
    };
  }

  /**
   * @description - A function that validates a custom environment variable
   * @param validator - A function that validates a custom environment variable from the raw value from the environment
   * @returns A function that validates a custom environment variable
   */
  custom<T, O extends boolean = false>(
    validator: (value: string | undefined) => T,
    options?: EnvironmentSchemaTypeOptions<O>
  ): EnvValidationCallback<
    O extends true ? EnvironmentCustom<T> | undefined : EnvironmentCustom<T>
  > {
    if (typeof validator !== 'function') {
      throw new Error('[Envitron] - Validator must be a function');
    }

    return (value: string | undefined) => {
      if (this.nonExistingValue(value)) {
        return {
          value: undefined as InferType<
            O extends true ? EnvironmentCustom<T> | undefined : EnvironmentCustom<T>
          >,
          error: this.isRequired(options) ? { type: 'required_and_missing' } : undefined,
        };
      }

      const result = validator(value);
      return {
        value: result as InferType<
          O extends true ? EnvironmentCustom<T> | undefined : EnvironmentCustom<T>
        >,
      };
    };
  }

  private isRequired<O extends boolean>(options?: EnvironmentSchemaTypeOptions<O>): boolean {
    if (options?.optional) {
      return options.optional === false;
    }

    return true;
  }

  private nonExistingValue(value: string | undefined) {
    return value === '' || value === undefined;
  }
}
