import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryService } from '../services/country.service';
import { CountryCard } from '../models/country-card';

@Injectable({ providedIn: 'root' })
export class CountryResolver implements Resolve<CountryCard | null> {
  
  private countryService= inject(CountryService);

  resolve(route: ActivatedRouteSnapshot): Observable<CountryCard | null> {
    const code = route.params['code'];
    
    // If countries already loaded, use them immediately
    if (this.countryService.areCountriesLoaded()) {
      const country = this.countryService.getCountryByCode(code);
      return of(country || null);
    }
    
    // Otherwise load countries first, then find the specific country
    return this.countryService.getAllCountries().pipe(
      map(() => {
        const country = this.countryService.getCountryByCode(code);
        return country || null;
      })
    );
  }
}