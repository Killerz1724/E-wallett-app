export function ConvertCurrencytoNumeric(val: string) {
  return Number(val.replace(/\./g, "").replace(",", "."));
}
