import { isOperator } from './get-corrected-expression';
import { tokenize } from './tokenize';

export const changeSign = (value: string): string => {
  const tokens = tokenize(value);
  if (tokens.length === 0) return value;

  const last = tokens[tokens.length - 1];
  const secondLast = tokens[tokens.length - 2];

  if (isOperator(last) && isOperator(secondLast) && last === '-') {
    return tokens.slice(0, -1).join('');
  }

  if (isOperator(last)) {
    return value + '-';
  }

  const isNegative = last.startsWith('-');
  const newTokens = [...tokens];
  newTokens[newTokens.length - 1] = isNegative ? last.slice(1) : '-' + last;

  return newTokens.join('');
};
