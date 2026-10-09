import { Component, OnInit, signal } from '@angular/core';
import { ApiService, QuizQuestion } from '../../services/api.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  template: `
    <header class="page-header">
      <div class="container">
        <span class="section-label">TEST YOUR KNOWLEDGE</span>
        <h1 class="mt-2">Media Literacy Quiz</h1>
        <p>Answer 10 questions and test how well you understand responsible information sharing.</p>
      </div>
    </header>

    <section class="section-padding">
      <div class="container">
        <div class="quiz-container">
          <div class="content-card">

            @if (loading()) {
              <p class="text-center text-muted mb-0">Loading questions...</p>
            } @else if (error()) {
              <div class="error-message">{{ error() }}</div>
              <button class="btn btn-primary mt-3" (click)="loadQuiz()">Try loading again</button>
            } @else if (finished()) {

              <!-- ===== RESULT ===== -->
              <div class="quiz-result">
                <div class="feature-icon mx-auto"><i class="bi bi-trophy"></i></div>
                <h2>Quiz Complete!</h2>
                <div class="quiz-score">{{ score() }}/{{ questions().length }}</div>
                <h4>{{ percentage() }}%</h4>
                <p>{{ performanceMessage() }}</p>
                <button class="btn btn-primary mt-3" (click)="restart()">
                  <i class="bi bi-arrow-clockwise me-2"></i>Try Again
                </button>
              </div>

            } @else {

              <!-- ===== ONE QUESTION AT A TIME ===== -->
              <div class="d-flex justify-content-between mb-2">
                <span class="question-number">Question {{ index() + 1 }} of {{ questions().length }}</span>
                <span class="text-muted">Score: {{ score() }}</span>
              </div>

              <div class="quiz-progress">
                <div class="quiz-progress-bar" [style.width.%]="((index() + 1) / questions().length) * 100"></div>
              </div>

              <h2 class="question-text">{{ questions()[index()].question }}</h2>

              @for (option of questions()[index()].options; track $index) {
                <button class="answer-option" [class.selected]="selected() === $index" (click)="selected.set($index)">
                  <i class="bi me-2" [class.bi-check-circle-fill]="selected() === $index"
                     [class.bi-circle]="selected() !== $index"></i>{{ option }}
                </button>
              }

              <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-primary" [disabled]="selected() === null" (click)="next()">
                  {{ index() + 1 === questions().length ? 'Finish' : 'Next' }}
                  <i class="bi bi-arrow-right ms-2"></i>
                </button>
              </div>
            }

          </div>
        </div>
      </div>
    </section>
  `
})
export class QuizComponent implements OnInit {
  questions = signal<QuizQuestion[]>([]);
  index = signal(0);               // which question we are on
  selected = signal<number | null>(null);
  score = signal(0);
  finished = signal(false);
  loading = signal(true);
  error = signal('');

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadQuiz();
  }

  // Ask the Node.js backend for the questions (GET /api/quiz)
  loadQuiz(): void {
    this.loading.set(true);
    this.error.set('');
    this.api.getQuiz().subscribe({
      next: (data) => { this.questions.set(data); this.loading.set(false); },
      error: () => {
        this.error.set('Could not load the quiz. Make sure the backend is running (node server.js).');
        this.loading.set(false);
      }
    });
  }

  // Called when the user presses Next / Finish
  next(): void {
    const chosen = this.selected();
    if (chosen === null) return;

    // Add a point if the chosen option is the correct one
    if (chosen === this.questions()[this.index()].correct) {
      this.score.set(this.score() + 1);
    }

    if (this.index() + 1 < this.questions().length) {
      this.index.set(this.index() + 1);
      this.selected.set(null);
    } else {
      this.finished.set(true);
    }
  }

  percentage(): number {
    return Math.round((this.score() / this.questions().length) * 100);
  }

  performanceMessage(): string {
    const p = this.percentage();
    if (p >= 90) return 'Excellent Media Literacy! You have a strong understanding of responsible information sharing.';
    if (p >= 70) return 'Good Media Literacy Skills! Keep applying these habits when you see information online.';
    if (p >= 50) return 'Keep Learning! You understand some important ideas, but there is more to explore.';
    return "Let's Learn More About Media Literacy! Visit the Learn page and try the quiz again.";
  }

  restart(): void {
    this.index.set(0);
    this.score.set(0);
    this.selected.set(null);
    this.finished.set(false);
  }
}
