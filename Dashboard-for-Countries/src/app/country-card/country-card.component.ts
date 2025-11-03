import { Component, inject } from '@angular/core';
import { CountryCard } from '../models/country-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-country-card',
  imports: [],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.css'
})
export class CountryCardComponent { 

private countryService=inject(CountryService);

countries=toSignal(this.countryService.getAllCountries(),{initialValue:[]});




}
