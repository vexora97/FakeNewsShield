import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CheckerComponent } from './components/checker/checker.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LearnComponent } from './components/learn/learn.component';
import { ReportComponent } from './components/report/report.component';

// Each URL path shows one component
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checker', component: CheckerComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'report', component: ReportComponent },
  { path: '**', redirectTo: '' }
];
