import { Injectable, inject, signal } from '@angular/core';
import { ApiCountry } from '../models/api-country';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CountryCard } from '../models/country-card';



@Injectable({
  providedIn: 'root'
})
export class CountryService {


  private http = inject(HttpClient);
  private allCountries = signal<CountryCard[]>([]);

  getAllCountries() {
    if (this.allCountries().length > 0) {
      return of(this.allCountries());
    }

    const fields = 'name,capital,population,region,flags,cca3,currencies,languages,borders,capital';

    return this.http.get<ApiCountry[]>('https://restcountries.com/v3.1/all', {
      params: { fields }
    }).pipe(
      map((countries: ApiCountry[]) => {
        const mappedCountries = countries.map((country: ApiCountry) => ({
          flagUrl: country.flags.png,
          name: country.name.common,
          officialName: country.name.official,
          capital: country.capital,
          languages: country.languages,
          currencies: country.currencies,
          borders: country.borders,
          population: country.population,
          region: country.region,
          cca3: country.cca3
        }));

        this.allCountries.set(mappedCountries);
        return mappedCountries;
      }),
      catchError(error => {
        console.error('Error fetching countries:', error);
        return of([]);
      })
    );
  }


  getCountryByCode(code: string): CountryCard {
    return this.allCountries().find(country => country.cca3 === code)!;
  }
}

