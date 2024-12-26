import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-work-personal',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './work-personal.component.html',
  styleUrl: './work-personal.component.scss'
})
export class WorkPersonalComponent {

}
