import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-work-school',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './work-school.component.html',
  styleUrl: './work-school.component.scss'
})
export class WorkSchoolComponent {

}
