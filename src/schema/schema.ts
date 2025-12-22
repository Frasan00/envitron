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
  NumberOptions,
  StringOptions,
} from './schema_types';

export class Schema {
  private readonly onlyDigitsAndFloatRegex = /^-?[0-9]+(\.[0-9]+)?$/;
  private readonly booleanRegex = /^true|false$/i;
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly hostRegex = /^[a-zA-Z0-9.-]+$/;
  private readonly urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  private readonly ipRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  private readonly uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  /**
   * @description - A function that validates a string environment variable
   * @description - Environment variables are required by default, unless the `optional` option is set to true
   * @param options - An object that contains the options for the environment variable
   * @returns A function that validates a string environment variable
   */
  string<O extends boolean = false>(
    options?: EnvironmentSchemaTypeOptions<O> & StringOptions
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

      const stringValue = value as string;

      if (!this.isStringValid(stringValue, options)) {
        return {
          value: undefined as InferType<
            O extends true ? EnvironmentString | undefined : EnvironmentString
          >,
          error: {
            type: 'wrong_type',
            foundType: typeof stringValue,
            expectedType: options?.format || 'string',
            foundValue: stringValue,
          },
        };
      }

      return {
        value: stringValue as InferType<
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
    options?: EnvironmentSchemaTypeOptions<O> & NumberOptions
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
        if (!this.isNumberValid(value, options)) {
          return {
            value: undefined as InferType<
              O extends true ? EnvironmentNumber | undefined : EnvironmentNumber
            >,
            error: {
              type: 'wrong_type',
              foundType: typeof value,
              expectedType: this.getNumberExpectedType(options),
              foundValue: String(value),
            },
          };
        }

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

      if (!this.isNumberValid(finalValue, options)) {
        return {
          value: undefined as InferType<
            O extends true ? EnvironmentNumber | undefined : EnvironmentNumber
          >,
          error: {
            type: 'wrong_type',
            foundType: typeof finalValue,
            expectedType: this.getNumberExpectedType(options),
            foundValue: String(finalValue),
          },
        };
      }

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

  private isStringValid(value: string, options?: StringOptions) {
    if (options?.format === 'email') {
      if (!this.emailRegex.test(value)) {
        return false;
      }
    }

    if (options?.format === 'url') {
      if (!this.urlRegex.test(value)) {
        return false;
      }
    }

    if (options?.format === 'ip') {
      if (!this.ipRegex.test(value)) {
        return false;
      }
    }

    if (options?.format === 'uuid') {
      if (!this.uuidRegex.test(value)) {
        return false;
      }
    }

    if (options?.format === 'host') {
      if (!this.hostRegex.test(value)) {
        return false;
      }
    }

    if (options?.format === 'regex') {
      if (!options.regex.test(value)) {
        return false;
      }
    }

    if ('minLength' in (options || {}) && options?.minLength !== undefined) {
      if (value.length < options.minLength) {
        return false;
      }
    }

    if ('maxLength' in (options || {}) && options?.maxLength !== undefined) {
      if (value.length > options.maxLength) {
        return false;
      }
    }

    return true;
  }

  private isNumberValid(value: number, options?: NumberOptions) {
    if (options?.min !== undefined && value < options.min) {
      return false;
    }

    if (options?.max !== undefined && value > options.max) {
      return false;
    }

    if (options?.positive && value <= 0) {
      return false;
    }

    return true;
  }

  private getNumberExpectedType(options?: NumberOptions): string {
    const constraints: string[] = [];

    if (options?.min !== undefined) {
      constraints.push(`min: ${options.min}`);
    }

    if (options?.max !== undefined) {
      constraints.push(`max: ${options.max}`);
    }

    if (options?.positive) {
      constraints.push('positive');
    }

    if (constraints.length > 0) {
      return `number (${constraints.join(', ')})`;
    }

    return 'number';
  }
}
