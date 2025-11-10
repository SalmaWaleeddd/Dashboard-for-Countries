import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

export const routes: Routes = [
    {path:'',component:HomePageComponent},
    {path:'country/:code',component:CountryDetailComponent},
    {path:'**',redirectTo:''}
];
