import NumberRule from './NumberRule';

export default class NumberRuleOptions extends NumberRule {
  public minValue: number;
  public maxValue: number;

  constructor() {
    super();
    this.minValue = Number.MIN_SAFE_INTEGER;
    this.maxValue = Number.MAX_SAFE_INTEGER;
  }

  public min(min: number): NumberRuleOptions {
    this.minValue = min;
    return this;
  }

  public max(max: number): NumberRuleOptions {
    this.maxValue = max;
    return this;
  }

  public range(min: number, max: number): NumberRuleOptions {
    this.minValue = min;
    this.maxValue = max;
    return this;
  }

  public optional(): NumberRule {
    this.isOptional = true;
    return this;
  }
}
