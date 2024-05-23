import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button type="submit">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location></app-housing-location>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {}
