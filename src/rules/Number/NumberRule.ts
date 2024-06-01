import Rule, { RuleValueEnum } from '../rule';

export default class NumberRule extends Rule {
  constructor() {
    super(RuleValueEnum.number);
  }
}
