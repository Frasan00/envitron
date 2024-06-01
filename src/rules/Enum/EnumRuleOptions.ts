import EnumRule from './EnumRule';

export default class EnumRuleOptions extends EnumRule {
  public values: string[];
  constructor(values: string[]) {
    super(values);
    this.values = values;
  }

  public optional(): EnumRule {
    this.isOptional = true;
    return this;
  }
}
