import BooleanRule from './BooleanRule';

export default class BooleanRuleOptions extends BooleanRule {
  constructor() {
    super();
  }

  public optional(): BooleanRule {
    this.isOptional = true;
    return this;
  }
}
