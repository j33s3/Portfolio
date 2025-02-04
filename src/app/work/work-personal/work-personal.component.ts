import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { ImageDisplayComponent } from '../../image-display/image-display.component';

@Component({
  selector: 'app-work-personal',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ImageDisplayComponent],
  templateUrl: './work-personal.component.html',
  styleUrl: '../work.scss'
})


export class WorkPersonalComponent implements OnInit {

  data: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProjects_Personal()
      .then(data => {
        this.data = data;
        sessionStorage.setItem('personalData', JSON.stringify(this.data));
      })
      .catch(error => {
        console.error('An error occured fetching personal work: ', error);
      })
  }


}
