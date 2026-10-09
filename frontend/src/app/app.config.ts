import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Routing (page navigation) - scroll to top on each new page
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    // HttpClient lets Angular talk to the Node.js backend
    provideHttpClient()
  ]
};
