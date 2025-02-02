import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-work-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.scss'
})
export class WorkDetailsComponent implements OnInit {
  // baseUrl = environment.dbBaseUrl;

  project: any;
  // private apiUrl = `${this.baseUrl}/projects/details`;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if(projectId) {
      this.fetchProjectDetails(projectId);
    }
  }


  fetchProjectDetails(id: string): void {
    // fetch(`${this.apiUrl}/${id}`)
    // .then(response => {
    //   if(!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`)
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   this.project = data;
    //   sessionStorage.setItem(`${this.project.projectName}__Data`, JSON.stringify(this.project));
    // })
    // .catch(error => {
    //   console.error('Error fetching data', error);
    // })
    
  }
}
