export const formatResult = (num: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 3,
  })
    .format(num)
    .replace(',', '.');
};
