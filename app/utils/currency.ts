import getSymbolFromCurrency from "currency-symbol-map";

type Rates = {
  [key: string]: number;
};

export const ratesToCurrencies = (rates: Rates) => {
  const currencies = [];
  for (const r in rates) {
    const symbol = getSymbolFromCurrency(r);
    const conversion_rate = rates[r];
    currencies.push({ iso: r, symbol, conversion_rate });
  }
  return currencies;
};
