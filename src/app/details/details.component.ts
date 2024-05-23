import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
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
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label id="firstName">First Name</label>
          <input type="text" id="first-name" formControlName="firstName" />

          <label id="lastName">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName" />

          <label id="email">Email</label>
          <input type="email" id="email" formControlName="email" />

          <button type="submit" class="primary">Apply</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);

    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((location) => {
        this.housingLocation = location;
      });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
