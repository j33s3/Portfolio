import { Component } from '@angular/core';
import { WorkSliderComponent } from '../work-slider/work-slider.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterOutlet, WorkSliderComponent, NavbarComponent],
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor() {
    console.log('HomeComponent Initialized');
  }

}
