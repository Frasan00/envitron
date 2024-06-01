import Rule, { RuleValueEnum } from '../rule';

export default class EnumRule extends Rule {
  public values: string[];
  constructor(values: string[]) {
    super(RuleValueEnum.enum);
    this.values = values;
  }
}
