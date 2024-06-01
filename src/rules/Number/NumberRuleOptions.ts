import Rule, { RuleValueEnum } from '../rule';
import NumberRule from './NumberRule';

export default class NumberRuleOptions extends NumberRule {
  public min: number;
  public max: number;

  constructor() {
    super();
    this.min = Number.MIN_SAFE_INTEGER;
    this.max = Number.MAX_SAFE_INTEGER;
  }

  public setMin(min: number): NumberRuleOptions {
    this.min = min;
    return this;
  }

  public setMax(max: number): NumberRuleOptions {
    this.max = max;
    return this;
  }

  public range(min: number, max: number): NumberRuleOptions {
    this.min = min;
    this.max = max;
    return this;
  }

  public optional(): NumberRule {
    this.isOptional = true;
    return this;
  }
}
