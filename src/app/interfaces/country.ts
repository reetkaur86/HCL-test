export interface Currency {
  name: string;
  code: string;
  symbol: string;
}

export interface Country {
  name: string;
  capital: string;
  population: number;
  currencies: Currency[];
  flag: string;
}
