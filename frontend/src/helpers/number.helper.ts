
export function formatNumberToCurrency(
  num: number,
  locale: string,
  currency: string
) {
  const intl = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  });
  return intl.format(num);
}
