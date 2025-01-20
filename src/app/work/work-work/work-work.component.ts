import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component'; 
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-work-work',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './work-work.component.html',
  styleUrl: '../work.scss'
})
export class WorkWorkComponent implements OnInit{
  baseUrl = environment.baseUrl;

  data: any[] = []

  ngOnInit(): void {
    this.fetchData();
  }


  fetchData(): void {
    const projectsPage = `${this.baseUrl}/projects/personal`;

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
