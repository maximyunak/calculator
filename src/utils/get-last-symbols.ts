export const getLastSymbols = (value: string): { last: string; secondLast: string } => {
  const last = value.slice(-1);
  const secondLast = value.slice(-2, -1);
  return { last, secondLast };
};
