import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  searchTerm = model('');
  selectedRegion = model('');

  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
}