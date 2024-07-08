import { ApplicationConfig, provideZoneChangeDetection , importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GlobalService } from '../Services/global.service';


// export function initializeApp(globalService: GlobalService) {
//   return (): Promise<any> => globalService.loadGlobalData();
// }

export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideAnimations(), provideRouter(routes),provideHttpClient(),importProvidersFrom(HttpClientModule),MessageService,GlobalService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeApp,
    //   deps: [GlobalService],
    //   multi: true
    // } 

   ]

};
