import { Component, computed, effect, inject, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { FilterComponent } from '../filter/filter.component';
import { CountryCardComponent } from '../country-card/country-card.component';

import { CountryService } from '../services/country.service';

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

  countries = toSignal(this.countryService.getAllCountries(), { initialValue: [] });
  filteredCountries = computed(() => {
    const search = this.searchTerm().toLowerCase();
    
    return this.countries().filter(country =>
      country.name.toLowerCase().includes(search) &&
      (this.selectedRegion() === 'all' || country.region === this.selectedRegion())
    );
  });


  constructor() {
    effect(() => {
      console.log(' Countries:', this.countries());
      console.log('Search Term:', this.searchTerm());
      console.log('Selected Region:', this.selectedRegion());
    });
  }

}
