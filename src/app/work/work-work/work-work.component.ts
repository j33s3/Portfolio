import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component'; 

@Component({
  selector: 'app-work-work',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './work-work.component.html',
  styleUrl: '../work.scss'
})
export class WorkWorkComponent implements OnInit{
  data: any[] = []

  ngOnInit(): void {
    this.fetchData();
  }


  fetchData(): void {
    const projectsPage = 'http://localhost:3000/api/projects/personal/';

    fetch(projectsPage)
    .then(response => {
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      this.data = data;
      sessionStorage.setItem('professionalData', JSON.stringify(this.data));
    })
    .catch(error => {
      console.error('Error fetching data', error);
    })

  }

}
