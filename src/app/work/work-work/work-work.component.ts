import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component'; 
import { ApiService } from '../../services/api.service';
import { ImageDisplayComponent } from '../../image-display/image-display.component';

@Component({
  selector: 'app-work-work',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ImageDisplayComponent],
  templateUrl: './work-work.component.html',
  styleUrl: '../work.scss'
})
export class WorkWorkComponent implements OnInit{

  data: any[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProjects_Professional()
      .then(data => {
        this.data = data;
        sessionStorage.setItem('professionalData', JSON.stringify(this.data));
      })
      .catch(error => {
        console.error('An error occured fetching work data: ', error);
      })
  }

}
