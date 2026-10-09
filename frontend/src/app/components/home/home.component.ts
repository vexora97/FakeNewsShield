import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface MythFact {
  statement: string;
  answer: 'myth' | 'fact';
  explanation: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- ================= HERO ================= -->
    <header class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-7">
            <span class="hero-badge"><i class="bi bi-shield-fill-check me-2"></i>Media Literacy Programme</span>
            <h1 class="hero-title mt-4">Fake News <span>Shield</span></h1>
            <h2 class="hero-tagline">Think Before You Share.</h2>
            <p class="hero-description">
              Fake news and misinformation can spread quickly through social media, websites and
              messaging platforms. Learn how to identify warning signs, verify information and
              become a responsible information sharer.
            </p>
            <div class="hero-buttons">
              <a routerLink="/checker" class="btn btn-primary btn-lg"><i class="bi bi-search me-2"></i>Check News</a>
              <a routerLink="/quiz" class="btn btn-outline-light btn-lg"><i class="bi bi-question-circle me-2"></i>Take the Quiz</a>
            </div>
            <div class="hero-note mt-4">
              <i class="bi bi-info-circle me-2"></i>
              Educational awareness tool: it cannot prove whether news is true or false.
            </div>
          </div>

          <div class="col-lg-5 mt-5 mt-lg-0">
            <div class="hero-shield-card">
              <div class="shield-icon"><i class="bi bi-shield-check"></i></div>
              <h3>Stay Informed.</h3>
              <p>Pause. Verify. Think. Then share.</p>
              <div class="shield-points">
                <div><i class="bi bi-check-circle-fill"></i> Check the source</div>
                <div><i class="bi bi-check-circle-fill"></i> Check the date</div>
                <div><i class="bi bi-check-circle-fill"></i> Compare information</div>
                <div><i class="bi bi-check-circle-fill"></i> Think before sharing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- ================= FEATURE CARDS ================= -->
    <section class="section-padding bg-light">
      <div class="container">
        <div class="section-heading text-center">
          <span class="section-label">WHAT YOU CAN DO</span>
          <h2>Build Better Information Habits</h2>
          <p>Explore simple tools designed to improve your media literacy.</p>
        </div>

        <div class="row g-4 mt-3">
          <div class="col-md-6 col-lg-3">
            <div class="feature-card">
              <div class="feature-icon"><i class="bi bi-search"></i></div>
              <h4>Fake News Checker</h4>
              <p>Identify common warning signs found in suspicious headlines and messages.</p>
              <a routerLink="/checker" class="feature-link">Check News <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="feature-card">
              <div class="feature-icon"><i class="bi bi-patch-question"></i></div>
              <h4>Media Literacy Quiz</h4>
              <p>Test your knowledge about responsible information sharing.</p>
              <a routerLink="/quiz" class="feature-link">Take Quiz <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="feature-card">
              <div class="feature-icon"><i class="bi bi-book"></i></div>
              <h4>Learn</h4>
              <p>Learn how misinformation spreads and how to verify information.</p>
              <a routerLink="/learn" class="feature-link">Start Learning <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="feature-card">
              <div class="feature-icon"><i class="bi bi-flag"></i></div>
              <h4>Report Suspicious News</h4>
              <p>Record suspicious information as part of this awareness programme.</p>
              <a routerLink="/report" class="feature-link">Report News <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= MYTH OR FACT ================= -->
    <section class="section-padding">
      <div class="container">
        <div class="myth-fact-box">
          <div class="row align-items-center">
            <div class="col-lg-5 mb-4 mb-lg-0">
              <span class="section-label">TEST YOUR THINKING</span>
              <h2>Myth or Fact?</h2>
              <p>Not everything that is popular online is true. Test your media literacy skills.</p>
            </div>

            <div class="col-lg-7">
              <div class="myth-card">
                <div class="myth-number">Statement {{ current() + 1 }} of {{ statements.length }}</div>
                <h4>{{ statements[current()].statement }}</h4>

                <div class="myth-buttons">
                  <button class="btn btn-outline-danger" [disabled]="result() !== null" (click)="answer('myth')">
                    <i class="bi bi-x-circle me-2"></i>MYTH
                  </button>
                  <button class="btn btn-outline-success" [disabled]="result() !== null" (click)="answer('fact')">
                    <i class="bi bi-check-circle me-2"></i>FACT
                  </button>
                </div>

                @if (result() !== null) {
                  <div class="myth-result" [class.wrong]="!result()!.correct">
                    <div>
                      <strong>{{ result()!.correct ? 'Correct!' : 'Not quite.' }}</strong>
                      The answer is {{ statements[current()].answer.toUpperCase() }}.
                      {{ statements[current()].explanation }}
                    </div>
                  </div>
                  <button class="btn btn-primary mt-3" (click)="next()">
                    Next Statement <i class="bi bi-arrow-right ms-2"></i>
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= STATISTICS ================= -->
    <section class="stats-section">
      <div class="container">
        <div class="row g-4 text-center">
          <div class="col-6 col-lg-3"><div class="stat-card"><div class="stat-number">5</div><div class="stat-label">Verification Steps</div></div></div>
          <div class="col-6 col-lg-3"><div class="stat-card"><div class="stat-number">{{ quizQuestions() }}</div><div class="stat-label">Quiz Questions</div></div></div>
          <div class="col-6 col-lg-3"><div class="stat-card"><div class="stat-number">8</div><div class="stat-label">Learning Topics</div></div></div>
          <div class="col-6 col-lg-3"><div class="stat-card"><div class="stat-number">{{ totalReports() }}</div><div class="stat-label">Reports Received</div></div></div>
        </div>
      </div>
    </section>

    <!-- ================= CALL TO ACTION ================= -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="section-label">READY TO CHECK?</span>
        <h2>Don't Share First. Verify First.</h2>
        <p>Learn simple habits that can help you make better decisions about information online.</p>
        <a routerLink="/checker" class="btn btn-primary btn-lg">Start Checking News <i class="bi bi-arrow-right ms-2"></i></a>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  // ---- Myth or Fact data (kept in the component to stay simple) ----
  statements: MythFact[] = [
    { statement: 'News with thousands of shares must be true.', answer: 'myth',
      explanation: 'Popularity does not prove accuracy. False information can also be widely shared.' },
    { statement: 'You should check the original source before sharing information.', answer: 'fact',
      explanation: 'The original source shows where the information came from and whether there is evidence.' },
    { statement: 'Old news can be misleading when it is shared as if it happened today.', answer: 'fact',
      explanation: 'A genuine old story becomes misleading when its date and context are removed.' },
    { statement: 'A dramatic headline always means the information is false.', answer: 'myth',
      explanation: 'A dramatic headline is a warning sign, but it does not automatically prove the story is false.' },
    { statement: 'Comparing several reliable sources can help verify a claim.', answer: 'fact',
      explanation: 'Independent sources help you spot missing context, errors and unsupported claims.' }
  ];

  // signals hold values that change; the page updates automatically
  current = signal(0);
  result = signal<{ correct: boolean } | null>(null);

  // Numbers for the statistics section (the backend can replace these)
  quizQuestions = signal(10);
  totalReports = signal(0);

  constructor(private api: ApiService) {}

  // Runs once when the page opens: ask the backend for statistics
  ngOnInit(): void {
    this.api.getStats().subscribe({
      next: (stats) => {
        this.quizQuestions.set(stats.quizQuestions);
        this.totalReports.set(stats.totalReports);
      },
      error: () => { /* backend not running: keep the default numbers */ }
    });
  }

  answer(choice: 'myth' | 'fact'): void {
    this.result.set({ correct: choice === this.statements[this.current()].answer });
  }

  next(): void {
    this.current.set((this.current() + 1) % this.statements.length);
    this.result.set(null);
  }
}
