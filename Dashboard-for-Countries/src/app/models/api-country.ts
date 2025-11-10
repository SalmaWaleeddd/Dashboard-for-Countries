export interface ApiCountry {
    name: {
        common: string;
        official: string;
    };
    flags: {
        png: string};
    capital: string[];
    languages: {
        [key: string]: string;
    };
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    borders: string[];
    cca3: string;
    population: number;
    region: string;
}