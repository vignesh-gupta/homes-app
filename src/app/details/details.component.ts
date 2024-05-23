import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        [alt]="housingLocation?.name"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }} , {{ housingLocation?.state }}
        </p>
      </section>

      <section class="listing-feature">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Unit Available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location has wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location has laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>

      <section class="listing-apply">
        <h2 class="section-heading">Apply to live here!</h2>
        <button class="primary" type="button">Apply</button>
      </section>
    </article>
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation =
      this.housingService.getHousingLocationById(housingLocationId);
  }
}
