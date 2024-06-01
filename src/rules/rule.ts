import BooleanRuleOptions from './Boolean/BooleanRuleOptions';
import EnumRuleOptions from './Enum/EnumRuleOptions';
import NumberRuleOptions from './Number/NumberRuleOptions';
import StringRuleOptions from './String/StringRuleOptions';

export type RuleValueTypes = string | number | boolean;

export enum RuleValueEnum {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  enum = 'enum',
}

export default abstract class Rule {
  public key: string;
  public valueType: RuleValueEnum;
  public isOptional: boolean;

  constructor(valueType: RuleValueEnum) {
    this.key = '';
    this.valueType = valueType;
    this.isOptional = false;
  }

  public validateAndParse(value: RuleValueTypes, rule: Rule): RuleValueTypes | null | undefined {
    switch (rule.valueType) {
      case RuleValueEnum.string:
        return this.validateStringRule(value, rule as StringRuleOptions);
      case RuleValueEnum.number:
        return this.validateNumberRule(value, rule as NumberRuleOptions);
      case RuleValueEnum.boolean:
        return this.validateBooleanRule(value, rule as BooleanRuleOptions);
      case RuleValueEnum.enum:
        return this.validateEnumRule(value, rule as EnumRuleOptions);
      default:
        return undefined;
    }
  }

  private validateStringRule(
    value: RuleValueTypes,
    rule: StringRuleOptions
  ): string | null | undefined {
    if (rule.isOptional && !value) {
      return undefined;
    }

    if (typeof value !== 'string') {
      return null;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return null;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return null;
    }

    if (rule.ip && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) {
      return null;
    }

    if (rule.url && !/^(http|https):\/\/[^\s]+$/.test(value)) {
      return null;
    }

    if (rule.email && !/^[^\s]+@[^\s]+$/.test(value)) {
      return null;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return null;
    }

    return value.trim() as string;
  }

  private validateNumberRule(
    value: RuleValueTypes,
    rule: NumberRuleOptions
  ): number | null | undefined {
    if (rule.isOptional && !value) {
      return undefined;
    }

    if (isNaN(value as number)) {
      return null;
    }

    if (rule.minValue && (value as number) < rule.minValue) {
      return null;
    }

    if (rule.maxValue && (value as number) > rule.maxValue) {
      return null;
    }

    return value as number;
  }

  private validateEnumRule(
    value: RuleValueTypes,
    rule: EnumRuleOptions
  ): string | null | undefined {
    if (rule.isOptional && !value) {
      return undefined;
    }

    if (typeof value !== 'string') {
      return null;
    }

    if (!rule.values.includes(value as string)) {
      return null;
    }

    return value as string;
  }

  private validateBooleanRule(
    value: RuleValueTypes,
    rule: BooleanRuleOptions
  ): boolean | null | undefined {
    if (rule.isOptional && !value) {
      return undefined;
    }

    if (value !== 'true' && value !== 'false') {
      return null;
    }

    return Boolean(value);
  }
}
