import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Warning {
  title: string;
  description: string;
  points: number;
}

interface CheckResult {
  level: 'low' | 'medium' | 'high';
  label: string;
  message: string;
  icon: string;
  score: number;
  warnings: Warning[];
}

// ------------------------------------------------------------
// Word lists used by the rule-based checker (easy to explain!)
// ------------------------------------------------------------
const SENSATIONAL = ['shocking', 'unbelievable', 'secret', 'scandal', 'amazing', 'explosive',
                     'incredible', 'outrageous', 'terrifying', 'miracle'];
const CLICKBAIT = ["you won't believe", 'you will not believe', 'what happens next',
                   'this changes everything', 'doctors hate this', 'click here', 'you need to see this'];
const URGENCY = ['share immediately', 'share now', 'forward this', 'send this to everyone',
                 'before it gets deleted', 'act now', 'urgent', 'do not wait'];
const ABSOLUTE = ['100% true', '100 percent true', 'guaranteed', 'everyone knows',
                  'no doubt', 'definitely true', 'completely true'];
const BREAKING = ['breaking', 'just in'];
const SOURCES = ['according to', 'source:', 'reported by', 'official website',
                 'reuters', 'bbc', 'associated press', 'news agency'];

@Component({
  selector: 'app-checker',
  standalone: true,
  imports: [FormsModule],
  template: `
    <header class="page-header">
      <div class="container">
        <span class="section-label">EDUCATIONAL TOOL</span>
        <h1 class="mt-2">Fake News Checker</h1>
        <p>Look for common warning signs in a headline or news message before deciding whether to share it.</p>
      </div>
    </header>

    <section class="section-padding">
      <div class="container">
        <div class="checker-box">
          <div class="content-card">
            <div class="text-center mb-4">
              <div class="feature-icon mx-auto"><i class="bi bi-search"></i></div>
              <h3>Check a News Message</h3>
              <p>Paste a headline or news message below.</p>
            </div>

            <label for="newsText" class="form-label">News headline or message</label>
            <textarea id="newsText" class="form-control" [(ngModel)]="newsText"
              placeholder="Example: BREAKING!!! You won't believe this shocking news! Share immediately!!!"></textarea>

            <div class="d-grid mt-4">
              <button class="btn btn-primary btn-lg" (click)="checkNews()">
                <i class="bi bi-shield-check me-2"></i>CHECK NEWS
              </button>
            </div>

            @if (error()) {
              <div class="error-message mt-4"><i class="bi bi-exclamation-circle me-2"></i>{{ error() }}</div>
            }

            @if (result(); as r) {
              <div class="result-box mt-4" [class]="'result-box result-' + r.level">
                <div class="result-title"><i class="bi {{ r.icon }} me-2"></i>{{ r.label }}</div>
                <p class="mb-0">{{ r.message }}</p>
                <p class="mt-2 mb-0">Warning score: <strong>{{ r.score }}</strong></p>

                @if (r.warnings.length > 0) {
                  <h5 class="mt-4">Warning Signs Detected</h5>
                  <ul class="warning-list">
                    @for (w of r.warnings; track w.title) {
                      <li>
                        <strong><i class="bi bi-exclamation-circle me-2"></i>{{ w.title }}
                          <span class="points">+{{ w.points }}</span></strong>
                        <div class="text-muted small mt-1">{{ w.description }}</div>
                      </li>
                    }
                  </ul>
                } @else {
                  <p class="mt-4 mb-0"><strong>No major warning signs were detected.</strong>
                    Remember that this does not prove the information is true.</p>
                }
              </div>
            }

            <div class="disclaimer">
              <strong><i class="bi bi-info-circle me-2"></i>Important:</strong>
              This checker is an educational demonstration based on simple warning signs.
              It cannot prove whether a news story is true or false.
              Always verify information using reliable sources.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-light">
      <div class="container">
        <div class="section-heading text-center">
          <span class="section-label">WARNING SIGNS</span>
          <h2>What Does the Checker Look For?</h2>
        </div>
        <div class="row g-4">
          @for (item of signs; track item.title) {
            <div class="col-md-6 col-lg-4">
              <div class="learn-card">
                <div class="learn-icon"><i class="bi {{ item.icon }}"></i></div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class CheckerComponent {
  newsText = '';
  result = signal<CheckResult | null>(null);
  error = signal('');

  // Cards shown at the bottom of the page
  signs = [
    { icon: 'bi-type-bold', title: 'Excessive Capital Letters', text: 'Text written almost entirely in capitals may be designed to grab attention.' },
    { icon: 'bi-exclamation-lg', title: 'Excessive Exclamation Marks', text: 'Many exclamation marks can show a sensational or emotional style.' },
    { icon: 'bi-megaphone', title: 'Sensational Language', text: 'Words such as shocking, unbelievable and secret can be warning signs.' },
    { icon: 'bi-mouse', title: 'Clickbait', text: 'Phrases that make people click without giving useful context.' },
    { icon: 'bi-clock', title: 'Urgency', text: 'Messages telling you to share immediately should be checked carefully.' },
    { icon: 'bi-link-45deg', title: 'Missing Source', text: 'Information without a clear source should be verified before sharing.' }
  ];

  // Helper: which words from a list appear in the text?
  private findWords(text: string, words: string[]): string[] {
    return words.filter((word) => text.includes(word));
  }

  checkNews(): void {
    const original = this.newsText.trim();

    // 1. Empty input
    if (original.length === 0) {
      this.result.set(null);
      this.error.set('Please enter a news headline or message.');
      return;
    }
    this.error.set('');

    const text = original.toLowerCase();
    const warnings: Warning[] = [];

    // 2. Run each rule. Every rule that matches adds a warning with points.

    // Rule: too many capital letters (2 points)
    const letters = original.match(/[a-zA-Z]/g);
    const capitals = original.match(/[A-Z]/g);
    if (letters && capitals && letters.length >= 10 && capitals.length / letters.length >= 0.55) {
      warnings.push({ title: 'Excessive capital letters', points: 2,
        description: 'A large part of the message is written in capital letters.' });
    }

    // Rule: 3 or more exclamation marks (1 point)
    const exclamations = original.match(/!/g);
    if (exclamations && exclamations.length >= 3) {
      warnings.push({ title: 'Too many exclamation marks', points: 1,
        description: 'Several exclamation marks are used to create excitement or urgency.' });
    }

    // Rule: sensational words (2 points)
    const sensational = this.findWords(text, SENSATIONAL);
    if (sensational.length > 0) {
      warnings.push({ title: 'Sensational language', points: 2,
        description: 'Words such as "' + sensational.join(', ') + '" can create an emotional reaction.' });
    }

    // Rule: clickbait phrases (3 points)
    if (this.findWords(text, CLICKBAIT).length > 0) {
      warnings.push({ title: 'Clickbait phrase', points: 3,
        description: 'The message uses language that encourages clicks without giving full context.' });
    }

    // Rule: urgency / "share immediately" (3 points)
    if (this.findWords(text, URGENCY).length > 0) {
      warnings.push({ title: 'Excessive urgency', points: 3,
        description: 'The message pushes people to act or share immediately.' });
    }

    // Rule: absolute claims such as "100% true" (3 points)
    if (this.findWords(text, ABSOLUTE).length > 0) {
      warnings.push({ title: 'Absolute claim', points: 3,
        description: 'A very strong claim is made without showing evidence.' });
    }

    // Rule: "breaking" wording (1 point)
    if (this.findWords(text, BREAKING).length > 0) {
      warnings.push({ title: 'Breaking-news wording', points: 1,
        description: 'Breaking-news wording can make people react before verifying.' });
    }

    // Rule: no source information in a short message (2 points)
    const hasSource = SOURCES.some((s) => text.includes(s));
    if (original.length < 250 && !hasSource) {
      warnings.push({ title: 'No clear source information', points: 2,
        description: 'No clear source was found. Look for the original publisher or evidence.' });
    }

    // 3. Add up the points
    const score = warnings.reduce((total, w) => total + w.points, 0);

    // 4. Decide the risk level from the score
    let outcome: Pick<CheckResult, 'level' | 'label' | 'message' | 'icon'>;
    if (score <= 2) {
      outcome = { level: 'low', label: 'LOW RISK', icon: 'bi-check-circle-fill',
                  message: 'Few common warning signs were detected.' };
    } else if (score <= 5) {
      outcome = { level: 'medium', label: 'NEEDS VERIFICATION', icon: 'bi-exclamation-triangle-fill',
                  message: 'Some warning signs were detected. Verify the information before sharing.' };
    } else {
      outcome = { level: 'high', label: 'HIGH RISK', icon: 'bi-shield-exclamation',
                  message: 'Several warning signs were detected. Check reliable sources before sharing.' };
    }

    this.result.set({ ...outcome, score, warnings });
  }
}
