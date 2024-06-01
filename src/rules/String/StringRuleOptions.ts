import Rule, { RuleValueEnum } from '../rule';
import StringRule from './StringRule';

export type StringOptions = {
  minLength?: number;
  maxLength?: number;
  ip?: boolean;
  url?: boolean;
  email?: boolean;
  pattern?: RegExp;
};

export default class StringRuleOptions extends Rule {
  public minLength?: number;
  public maxLength?: number;
  public ip: boolean;
  public url: boolean;
  public email: boolean;
  public pattern?: RegExp;

  constructor() {
    super(RuleValueEnum.string);
    this.ip = false;
    this.url = false;
    this.email = false;
  }

  public setMinLength(minLength: number): this {
    this.minLength = minLength;
    return this;
  }

  public setMaxLength(maxLength: number): this {
    this.maxLength = maxLength;
    return this;
  }

  public setIp(): this {
    this.ip = true;
    return this;
  }

  public mustBeUrl(): this {
    this.url = true;
    return this;
  }

  public mustBeEmail(): this {
    this.email = true;
    return this;
  }

  public regex(pattern: RegExp): this {
    this.pattern = pattern;
    return this;
  }

  public optional(): StringRule {
    this.isOptional = true;
    return this;
  }
}
