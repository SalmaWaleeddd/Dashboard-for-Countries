import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CountryService } from '../services/country.service';
import { ActivatedRoute } from '@angular/router';
import { CountryCard } from '../models/country-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent implements OnInit {

  private countryService = inject(CountryService);
  private route = inject(ActivatedRoute);

  country = signal<CountryCard | undefined>(undefined)
  code = signal<string>('');


  borderCountries = computed(() => {
    const borders = this.country()?.borders;
    if (!borders || borders.length === 0) return 'None';

    return borders.map(code => {
      const country = this.countryService.getCountryByCode(code);
      return country ? country.name : code;
    }).join(', ');
  });


  ngOnInit(): void {
    this.route.data.subscribe(data => {
     ;

      const countryData = data['country'];
      console.log('Country data found:', countryData?.name);

      this.country.set(countryData); 
      console.log('Signal updated:', this.country());
      this.code.set(this.route.snapshot.params['code']);
    });
  }

  formatLanguages(languages: { [key: string]: string } | undefined): string {
    if (!languages) return 'None';
    return Object.values(languages).join(', ');
  }

  formatCurrencies(currencies: { [key: string]: { name: string; symbol: string } } | undefined): string {
    if (!currencies) return 'None';

    return Object.values(currencies)
      .map(currency => currency.symbol ? `${currency.name} (${currency.symbol})` : currency.name)
      .join(', ');
  }

}
