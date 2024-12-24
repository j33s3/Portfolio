import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `<h1> Hello There </h1>`,
  // templateUrl: './about.component.html',
  // styleUrl: './about.component.scss'
})
export class AboutComponent {

}
