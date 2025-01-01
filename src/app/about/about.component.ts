import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{

  data: any[] = []

  constructor() {}


  ngOnInit(): void {
    const cachedData = sessionStorage.getItem('aboutData');
    if (cachedData) {
      this.data = JSON.parse(cachedData);
    } else {
      this.fetchData();
    }
  }

  fetchData() : void {
    const about = 'http://localhost:3000/api/about';                      // URL to the about contents

    fetch(about)
      .then(response => {                                                 // Check is the response is good
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();                                           // If good then return response
      })
      .then(data => {                                                     // Set data to the class variable
        this.data = data;
        sessionStorage.setItem('aboutData', JSON.stringify(this.data));
        console.log(this.data);
      })
      .catch(error => {                                                   // Upon reaching an error print it to console
        console.error('Error fetching data:', error);
      })
  }
}
