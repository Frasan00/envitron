import Rule, { RuleValueEnum } from '../rule';

export default class BooleanRule extends Rule {
  constructor() {
    super(RuleValueEnum.boolean);
  }
}
