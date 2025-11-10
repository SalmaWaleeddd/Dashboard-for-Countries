export interface CountryCard {
  flagUrl: string;
  name: string;
  officialName: string;
  capital: string[];
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
  borders: string[];
  population: number;
  region: string;
  cca3: string;
}