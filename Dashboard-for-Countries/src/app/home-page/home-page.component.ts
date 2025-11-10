import { Component, computed, inject, model } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { FilterComponent } from '../filter/filter.component';
import { CountryCardComponent } from '../country-card/country-card.component';

import { CountryService } from '../services/country.service';
import { combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [FilterComponent, CountryCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private countryService = inject(CountryService);

  searchTerm = model('');
  selectedRegion = model('all');
  distinctFilters = toSignal(
    combineLatest([
      toObservable(this.searchTerm),
      toObservable(this.selectedRegion)
    ]).pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) =>
        prev[0] === curr[0] && prev[1] === curr[1]
      )
    ),
    { initialValue: ['', 'all'] }
  );

  countries = toSignal(this.countryService.getAllCountries(), { initialValue: [] });
  filteredCountries = computed(() => {
    const [search, region] = this.distinctFilters();
    console.log('Filtering with Search:', search, 'Region:', region);

     return this.countries().filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()) &&
    (region === 'all' || country.region === region)
  );
  });

  totalPopulation = computed(() =>
    this.filteredCountries().reduce((sum, country) => sum + country.population, 0)
  );

}
