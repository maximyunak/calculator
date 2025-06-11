import { tokenize } from './tokenize';

export const calculate = (value: string): number => {
  const tokens = tokenize(value);
  console.log('🚀 ~ calculate ~ tokens:', tokens);
  let res = parseFloat(tokens[0]);

  if (tokens.length === 0) return 0;

  for (let i = 0; i < tokens.length; i++) {
    const element = tokens[i];
    let num = parseFloat(tokens[i + 1]);
    switch (element) {
      case '+':
        res += num;
        break;
      case '*':
        res *= num;
        break;
      case '/':
        if (num === 0) {
          throw new Error('Деление на 0. ∞');
        }
        res /= num;

        break;
      case '-':
        res -= num;
        break;
      case '%':
        res /= 100;
        break;
      default:
        break;
    }
  }
  return res;
};
