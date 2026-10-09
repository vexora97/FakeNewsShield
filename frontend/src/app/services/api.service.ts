import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Shapes of the data we send/receive (TypeScript interfaces)
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;      // index of the correct option
}

export interface ReportData {
  name: string;
  email: string;
  platform: string;
  news: string;
  reason: string;
}

export interface Stats {
  totalReports: number;
  quizQuestions: number;
}

// ApiService = the ONLY place where Angular talks to the Node.js backend.
// Components call these methods instead of using HttpClient directly.
@Injectable({ providedIn: 'root' })
export class ApiService {
private baseUrl = window.location.port === '4200'
  ? `http://${window.location.hostname}:3000/api`
  : '/api';

  constructor(private http: HttpClient) {}

  // GET /api/quiz
  getQuiz(): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${this.baseUrl}/quiz`);
  }

  // POST /api/reports  (the report is sent as JSON)
  submitReport(report: ReportData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/reports`, report);
  }

  // GET /api/stats
  getStats(): Observable<Stats> {
    return this.http.get<Stats>(`${this.baseUrl}/stats`);
  }
}
