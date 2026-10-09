import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, ReportData } from '../../services/api.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [FormsModule],
  template: `
    <header class="page-header">
      <div class="container">
        <span class="section-label">AWARENESS PROGRAMME</span>
        <h1 class="mt-2">Report Suspicious News</h1>
        <p>Help record suspicious information for educational awareness and media-literacy activities.</p>
      </div>
    </header>

    <section class="section-padding">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="content-card">
              <div class="text-center mb-4">
                <div class="feature-icon mx-auto"><i class="bi bi-flag"></i></div>
                <h3>Submit a Report</h3>
                <p>Provide the information below. Name and email are optional.</p>
              </div>

              <form (ngSubmit)="submit()">
                <div class="mb-3">
                  <label for="name" class="form-label">Name <span class="text-muted">(Optional)</span></label>
                  <input id="name" name="name" type="text" class="form-control"
                         [(ngModel)]="form.name" placeholder="Enter your name">
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email <span class="text-muted">(Optional)</span></label>
                  <input id="email" name="email" type="email" class="form-control"
                         [(ngModel)]="form.email" placeholder="Enter your email">
                </div>

                <div class="mb-3">
                  <label for="platform" class="form-label">Platform <span class="text-danger">*</span></label>
                  <select id="platform" name="platform" class="form-select" [(ngModel)]="form.platform">
                    <option value="">Select platform</option>
                    @for (p of platforms; track p) {
                      <option [value]="p">{{ p }}</option>
                    }
                  </select>
                </div>

                <div class="mb-3">
                  <label for="news" class="form-label">News Headline / Message <span class="text-danger">*</span></label>
                  <textarea id="news" name="news" class="form-control" [(ngModel)]="form.news"
                            placeholder="Enter the suspicious headline or message"></textarea>
                </div>

                <div class="mb-3">
                  <label for="reason" class="form-label">Why do you think it is suspicious? <span class="text-danger">*</span></label>
                  <textarea id="reason" name="reason" class="form-control" [(ngModel)]="form.reason"
                            placeholder="Explain the warning signs or concerns you noticed"></textarea>
                </div>

                <div class="d-grid mt-4">
                  <button type="submit" class="btn btn-primary btn-lg" [disabled]="sending()">
                    <i class="bi bi-send me-2"></i>{{ sending() ? 'Sending...' : 'Submit Report' }}
                  </button>
                </div>
              </form>

              @if (success()) {
                <div class="success-message mt-3"><i class="bi bi-check-circle-fill me-2"></i>{{ success() }}</div>
              }
              @if (error()) {
                <div class="error-message mt-3"><i class="bi bi-exclamation-circle me-2"></i>{{ error() }}</div>
              }

              <div class="disclaimer mt-4">
                <strong><i class="bi bi-info-circle me-2"></i>Notice:</strong>
                Reports are saved in a JSON file on the programme's server for educational use.
                They are not sent to any public authority.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-light">
      <div class="container">
        <div class="section-heading text-center">
          <span class="section-label">BEFORE REPORTING</span>
          <h2>Remember These Habits</h2>
        </div>
        <div class="row g-4">
          <div class="col-md-4"><div class="feature-card text-center"><div class="feature-icon mx-auto"><i class="bi bi-pause-circle"></i></div>
            <h4>Pause</h4><p>Don't immediately forward or repost suspicious information.</p></div></div>
          <div class="col-md-4"><div class="feature-card text-center"><div class="feature-icon mx-auto"><i class="bi bi-search"></i></div>
            <h4>Verify</h4><p>Check the source, date, evidence and other reliable sources.</p></div></div>
          <div class="col-md-4"><div class="feature-card text-center"><div class="feature-icon mx-auto"><i class="bi bi-share"></i></div>
            <h4>Share Responsibly</h4><p>Share information only after considering its reliability and context.</p></div></div>
        </div>
      </div>
    </section>
  `
})
export class ReportComponent {
  platforms = ['WhatsApp', 'Instagram', 'YouTube', 'Facebook', 'Website', 'Other'];

  // The form fields are bound to this object with [(ngModel)]
  form: ReportData = { name: '', email: '', platform: '', news: '', reason: '' };

  sending = signal(false);
  success = signal('');
  error = signal('');

  constructor(private api: ApiService) {}

  submit(): void {
    this.success.set('');
    this.error.set('');

    // 1. Check required fields
    if (!this.form.platform || !this.form.news.trim() || !this.form.reason.trim()) {
      this.error.set('Please complete all required fields.');
      return;
    }

    // 2. Send the report to Node.js: POST http://localhost:3000/api/reports
    this.sending.set(true);
    this.api.submitReport(this.form).subscribe({
      next: (response) => {
        this.success.set(response.message);   // "Thank you! Your report has been recorded..."
        this.form = { name: '', email: '', platform: '', news: '', reason: '' };
        this.sending.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Could not reach the server. Is the backend running?');
        this.sending.set(false);
      }
    });
  }
}
