import { Component, inject, input } from '@angular/core';
import { CountryCard } from '../models/country-card';



@Component({
  selector: 'app-country-card',
  imports: [],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.css'
})
export class CountryCardComponent { 


countries=input<CountryCard[]>();




}
