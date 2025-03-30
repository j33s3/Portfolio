import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  dropDownOpen: boolean = false;
  isTouchDevice: boolean = false;


  // Detect if the user is accessing via a touchscreen device
  ngOnInit(): void {
    this.isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
  }

  toggleDropdown(): void {
      this.dropDownOpen = !this.dropDownOpen;
      console.log(this.dropDownOpen);
  }
}
