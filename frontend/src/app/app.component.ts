import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

// Root component: navbar on top, the current page in the middle, footer at the bottom
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer class="site-footer">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5">
            <h4><i class="bi bi-shield-check me-2"></i>Fake News Shield</h4>
            <p>Fake News Detection and Media Literacy Programme. Helping students and
               communities develop responsible information-sharing habits.</p>
          </div>
          <div class="col-6 col-lg-3">
            <h5>Quick Links</h5>
            <ul class="footer-links">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/checker">Fake News Checker</a></li>
              <li><a routerLink="/quiz">Quiz</a></li>
              <li><a routerLink="/learn">Learn</a></li>
              <li><a routerLink="/report">Report</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-4">
            <h5>Remember</h5>
            <p class="footer-quote">"Pause. Verify. Think. Then share."</p>
          </div>
        </div>
        <hr>
        <div class="footer-bottom">
          <span>© 2026 Fake News Shield</span>
          <span>Educational Community Project</span>
        </div>
      </div>
    </footer>
  `
})
export class AppComponent {}
