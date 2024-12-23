import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { WorkSliderComponent } from './app/work-slider/work-slider.component';

bootstrapApplication(WorkSliderComponent, appConfig)
  .catch((err) => console.error(err));
