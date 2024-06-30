import { ApplicationConfig, provideZoneChangeDetection , importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideAnimations(), provideRouter(routes),provideHttpClient(),importProvidersFrom(HttpClientModule),MessageService ]

};
