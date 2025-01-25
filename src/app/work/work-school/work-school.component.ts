import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-work-school',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './work-school.component.html',
  styleUrl: '../work.scss'
})
export class WorkSchoolComponent implements OnInit {
  baseUrl = environment.dbBaseUrl;

  data!: any[]

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const projectsPage = `${this.baseUrl}/projects/school`;

    fetch(projectsPage)
    .then(response => {
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      this.data = data;
      sessionStorage.setItem('schoolData', JSON.stringify(this.data));
    })
    .catch(error => {
      console.error('Error fetching data', error);
    })
  }




}
