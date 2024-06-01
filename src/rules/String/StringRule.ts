import Rule, { RuleValueEnum } from '../rule';

export type StringOptions = {
  minLength?: number;
  maxLength?: number;
  ip?: boolean;
  url?: boolean;
  email?: boolean;
  pattern?: RegExp;
};

export default class StringRule extends Rule {
  constructor() {
    super(RuleValueEnum.string);
  }
}
