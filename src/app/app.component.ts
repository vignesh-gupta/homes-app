import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
@Component({
  standalone: true,
  selector: 'app-root',
  template: ` <main>
    <header class="brand-name">
      <img src="/assets/logo.svg" alt="Homes App" aria-hidden="true" />
    </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent, RouterModule],
})
export class AppComponent {
  title = 'Homes App';
}
