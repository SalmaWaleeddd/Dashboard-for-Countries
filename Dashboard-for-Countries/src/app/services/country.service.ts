import { Injectable, inject } from '@angular/core';
import { ApiCountry } from '../models/api-country';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CountryService {


  private http = inject(HttpClient);

  getAllCountries() {
    const fields = 'name,capital,population,region,flags,cca3,currencies,languages,borders';

    return this.http.get<ApiCountry[]>('https://restcountries.com/v3.1/all', {
      params: { fields }
    }).pipe(
      map((countries: ApiCountry[]) => countries.map((country: ApiCountry) => ({
        flagUrl: country.flags.png,
        name: country.name.common,
        region: country.region,
        population: country.population,
        cca3: country.cca3
      }))),
      catchError(error => {
        console.error('Error fetching countries:', error);
        return []; 
      })
    );
  }
}

