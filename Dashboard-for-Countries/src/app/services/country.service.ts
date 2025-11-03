import { Injectable, inject } from '@angular/core';
import { CountryCard } from '../models/country-card';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  

  private http= inject(HttpClient);

  getAllCountries() {
  const fields = 'name,capital,population,region,flags,cca3,currencies,languages,borders';
  
  return this.http.get<CountryCard[]>('https://restcountries.com/v3.1/all', {
    params: { fields }
  }).pipe(
    map((countries:CountryCard[]) => countries.map((country:CountryCard) => ({
      flagUrl: country.flags.png,
      name: country.name.common,
      region: country.region,
      population: country.population,
      cca3: country.cca3
    })))
  );            
}
}

