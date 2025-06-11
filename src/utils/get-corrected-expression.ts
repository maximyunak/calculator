import { getLastSymbols } from './get-last-symbols';
import { operatorRegExp } from './regex';
import { tokenize } from './tokenize';

// для корректного ввода

export const isOperator = (char: string) => operatorRegExp.test(char);

export const getCorrectedExpression = (expr: string, char: string): string => {
  const { last, secondLast } = getLastSymbols(expr);

  const tokens = tokenize(expr);

  if (expr.length === 0 && isOperator(char) && char !== '-') {
    return expr;
  }

  //дальше ломается
  if (+(expr + char) > Number.MAX_SAFE_INTEGER) {
    // return expr;
    throw new Error('Максимальное значение');
  }

  if (isOperator(char)) {
    if (isOperator(last) && isOperator(secondLast)) {
      return expr.slice(0, -2) + char;
    }

    if (isOperator(last)) {
      if (char === '-' && last !== '-') {
        return expr + char;
      }

      return expr.slice(0, -1) + char;
    }
  }
  if (char === '.' && tokens[tokens.length - 1].includes('.')) {
    return expr;
  }

  console.log('🚀 ~ getCorrectedExpression ~ expr + char:', expr + char);
  return expr + char;
};
