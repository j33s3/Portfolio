import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { ImageDisplayComponent } from '../../image-display/image-display.component';

@Component({
  selector: 'app-work-school',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ImageDisplayComponent],
  templateUrl: './work-school.component.html',
  styleUrl: '../work.scss'
})
export class WorkSchoolComponent implements OnInit {

  data!: any[]

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProjects_School()
      .then(data => {
        this.data = data;
        sessionStorage.setItem('schoolData', JSON.stringify(this.data));
      })
      .catch(error => {
        console.error('An error occured fetching school data', error);
      })
  }

}
