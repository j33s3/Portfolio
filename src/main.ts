import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { WorkSliderComponent } from './app/work-slider/work-slider.component'; 
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/home/home.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Bootstrapping Error:', err));

console.log('Application is bootstrapping...')
