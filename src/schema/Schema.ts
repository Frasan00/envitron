import BooleanRuleOptions from '../rules/Boolean/BooleanRuleOptions';
import EnumRuleOptions from '../rules/Enum/EnumRuleOptions';
import NumberRuleOptions from '../rules/Number/NumberRuleOptions';
import StringRuleOptions from '../rules/String/StringRuleOptions';

type envFileNames =
  | '.env'
  | '.env.local'
  | '.env.development'
  | '.env.production'
  | '.env.test'
  | '.env.staging'
  | '.local.env'
  | '.development.env'
  | '.production.env'
  | '.test.env'
  | '.staging.env';

export default class EnvSchema {
  public envFileHierarchy: envFileNames[] | envFileNames;
  public throwErrorOnValidationFail: boolean;

  /**
   * @description Schema class is used to define the rules for the environment variables
   * @description rules - object containing the rules for the environment variables
   * @description envFileHierarchy - array of strings containing the hierarchy of the env files to be loaded
   * @description throwErrorOnValidationFail - boolean to determine if an error should be thrown when env validation fails
   */
  constructor() {
    this.envFileHierarchy = ['.env'];
    this.throwErrorOnValidationFail = true;
  }

  /**
   * @description String rule is used to define environment variables that contain strings
   * @description Used for simple strings that do not require any special validation, note string envs will be trimmed, if you need to preserve whitespace use the literal rule
   */
  public string(): StringRuleOptions {
    return new StringRuleOptions();
  }

  /**
   * @description Number rule is used to define environment variables that contain numbers
   * @description Used for numbers that require min and max validation
   * @param options - object containing min or max properties
   */
  public number(): NumberRuleOptions {
    return new NumberRuleOptions();
  }

  /**
   * @description Enum rule is used to define environment variables that contain a set of predefined values
   * @description Used for environment variables that must be one of a set of values
   * @param values - array of strings containing the allowed values
   */
  public enum(values: string[]): EnumRuleOptions {
    return new EnumRuleOptions(values);
  }

  /**
   * @description Boolean rule is used to define environment variables that contain boolean values
   * @description Used for environment variables that must be either true or false
   */
  public boolean(): BooleanRuleOptions {
    return new BooleanRuleOptions();
  }
}
