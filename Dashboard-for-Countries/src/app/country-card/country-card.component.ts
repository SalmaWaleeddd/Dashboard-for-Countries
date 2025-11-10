import { Component, inject, input } from '@angular/core';
import { CountryCard } from '../models/country-card';
import { Router } from '@angular/router';



@Component({
  selector: 'app-country-card',
  imports: [],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.css'
})
export class CountryCardComponent {

  private router = inject(Router);

  countries = input<CountryCard[]>();

  navigateToDetails(countryCode: string) {
    this.router.navigate(['country', countryCode]);
  }

}
