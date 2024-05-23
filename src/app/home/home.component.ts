import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule],
  template: `
    <section>
      <div>
        <input type="text" placeholder="Filter by city" #filter />
        <button type="submit" (click)="filterResult(filter.value)">
          Search
        </button>
      </div>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationsList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  housingLocations: HousingLocation[] = [];
  filteredLocationsList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().then((locations) => {
      this.housingLocations = locations;
      this.filteredLocationsList = locations;
    });
  }

  filterResult(filter: string) {
    console.log('filterResult', filter);

    if (!filter) {
      this.filteredLocationsList = this.housingLocations;
      return;
    }

    this.filteredLocationsList = this.housingLocations.filter((location) =>
      location.city.toLowerCase().includes(filter.toLowerCase())
    );

    console.log('done');
  }
}
