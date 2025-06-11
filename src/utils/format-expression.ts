import { formatResult } from './format-result';
import { onlyNum } from './regex';
import { tokenize } from './tokenize';

export const formatExpression = (expr: string): string => {
  const nums = tokenize(expr);
  const formatted = [];
  for (const element of nums) {
    if (onlyNum.test(element)) {
      const isEndDot = element.endsWith('.');
      const num = Number(isEndDot ? element.slice(0, -1) : element);
      let formattedNum = formatResult(num);
      if (isEndDot) formattedNum += '.';
      formatted.push(formattedNum);
    } else {
      formatted.push(element);
    }
  }

  return formatted.join('');
};
