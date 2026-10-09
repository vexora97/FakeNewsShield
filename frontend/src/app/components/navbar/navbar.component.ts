import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/" (click)="open.set(false)">
          <i class="bi bi-shield-check me-2"></i>Fake News Shield
        </a>

        <!-- Mobile menu button: flips the "open" signal -->
        <button class="navbar-toggler" type="button" aria-label="Toggle navigation"
                (click)="open.set(!open())">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse collapse" [class.show]="open()">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: true }" (click)="open.set(false)">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/checker" routerLinkActive="active"
                 (click)="open.set(false)">Fake News Checker</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/quiz" routerLinkActive="active"
                 (click)="open.set(false)">Quiz</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/learn" routerLinkActive="active"
                 (click)="open.set(false)">Learn</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/report" routerLinkActive="active"
                 (click)="open.set(false)">Report</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  // true when the mobile menu is open
  open = signal(false);
}
