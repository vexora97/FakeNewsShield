import { Component } from '@angular/core';

@Component({
  selector: 'app-learn',
  standalone: true,
  template: `
    <header class="page-header">
      <div class="container">
        <span class="section-label">MEDIA LITERACY</span>
        <h1 class="mt-2">Learn to Spot Misinformation</h1>
        <p>Simple lessons to help you understand, verify and responsibly share information.</p>
      </div>
    </header>

    <section class="section-padding">
      <div class="container">
        <div class="section-heading text-center">
          <span class="section-label">LEARNING CENTRE</span>
          <h2>Understand Before You Share</h2>
          <p>Explore these simple media literacy concepts.</p>
        </div>

        <div class="row g-4">
          @for (t of topics; track t.title) {
            <div class="col-md-6 col-lg-4">
              <div class="learn-card">
                <div class="learn-icon"><i class="bi {{ t.icon }}"></i></div>
                <h3>{{ t.title }}</h3>
                <p>{{ t.text }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section-padding bg-light">
      <div class="container">
        <div class="section-heading text-center">
          <span class="section-label">SIMPLE METHOD</span>
          <h2>5-Step Verification Method</h2>
          <p>Follow these five steps before sharing suspicious information.</p>
        </div>

        <div class="row g-4">
          @for (s of steps; track s.title; let i = $index) {
            <div class="col-6 col-lg" [class.col-12]="i === 4">
              <div class="step-card">
                <div class="step-number">{{ i + 1 }}</div>
                <h4>{{ s.title }}</h4>
                <p>{{ s.text }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class LearnComponent {
  topics = [
    { icon: 'bi-newspaper', title: 'What is Fake News?',
      text: 'Fake news is false or misleading information presented so that it looks like genuine news.' },
    { icon: 'bi-arrow-left-right', title: 'Misinformation vs Disinformation',
      text: 'Misinformation is false information shared without meaning harm. Disinformation is created or spread on purpose to deceive.' },
    { icon: 'bi-share', title: 'How Fake News Spreads',
      text: 'It spreads through social media, messaging apps, videos, websites and word of mouth, often because it feels shocking.' },
    { icon: 'bi-globe2', title: 'How to Check a Source',
      text: 'Look for the author, the organisation, the original source and the evidence behind the claim.' },
    { icon: 'bi-calendar3', title: 'Why Checking the Date Matters',
      text: 'Old stories can be shared as if they are new. Always check when information was first published.' },
    { icon: 'bi-type-h1', title: 'How Headlines Can Mislead',
      text: 'Some headlines use emotion or clickbait to get clicks without giving enough context.' },
    { icon: 'bi-image', title: 'Checking Images and Context',
      text: 'Images can be old, edited or taken from another event. Check where a picture really comes from.' },
    { icon: 'bi-hand-thumbs-up', title: 'Think Before You Share',
      text: 'Stop, verify, and ask yourself whether sharing could mislead someone else.' }
  ];

  steps = [
    { title: 'Stop', text: "Don't immediately forward the information." },
    { title: 'Check the Source', text: 'Find the original publisher or source.' },
    { title: 'Check the Date', text: 'Make sure the information is current.' },
    { title: 'Compare Other Sources', text: 'Check other reliable sources.' },
    { title: 'Think Before Sharing', text: 'Share only after considering the evidence.' }
  ];
}
