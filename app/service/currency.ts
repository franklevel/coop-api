import axios from "axios";

const CURRENCY_API_URL = "https://api.apilayer.com/fixer";
const DEFAULT_ISO = "USD";

export interface ICurrencyResponse {
  iso: string;
  symbol: string;
  conversion_rate: number;
}
export class CurrencyService {
  private config;
  constructor() {
    this.config = {
      headers: {
        apikey: process.env.FIXER_API_KEY,
      },
    };
  }
  /**
   * Get rates from symbols {comma separeted: ARS,USD}
   * @param iso
   */
  public async getRates(iso: string): Promise<any> {
    let finalUrl = `${CURRENCY_API_URL}/latest?base=USD&symbols=${this.toSymbols(
      iso
    )}`;
    return axios.get<ICurrencyResponse>(`${finalUrl}`, this.config);
  }

  /**
   * Get rates from symbols {comma separeted: ARS,USD}
   * @param iso
   */
  public async getMockedRates(iso: string): Promise<any> {
    console.log(`Performing a currency request to ${iso}`);
    return new Promise((resolve) => {
      setInterval(
        () =>
          resolve({
            data: {
              rates: {
                ARS: 143.168492,
                USD: 1,
              },
            },
          }),
        2000
      );
    });
  }

  private toSymbols(iso: string) {
    if (!iso) throw new Error("You have to supply a valid ISO currency code.");
    return `${DEFAULT_ISO},${iso}`;
  }
}
