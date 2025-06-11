export const tokenize = (expr: string): string[] => {
  const tokens: string[] = [];
  let current = '';
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if (/\d/.test(char) || char === '.') {
      current += char;
    } else if (char === '+' || char === '-' || char === '*' || char === '/' || char === '%') {
      if (current === '' && (char === '+' || char === '-')) {
        current = char;
      } else {
        if (current !== '') tokens.push(current);
        tokens.push(char);
        current = '';
      }
    } else if (char === ' ') {
      continue;
    } else {
      throw new Error(`Ошибка формата`);
    }
  }
  if (current !== '') tokens.push(current);
  console.log('🚀 ~ tokens:', tokens);
  return tokens;
};
