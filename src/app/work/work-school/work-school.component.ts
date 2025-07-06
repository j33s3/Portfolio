import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { ImageDisplayComponent } from '../../image-display/image-display.component';
import fs from 'fs';

@Component({
    selector: 'app-work-school',
    imports: [CommonModule, NavbarComponent, ImageDisplayComponent],
    standalone: true,
    templateUrl: './work-school.component.html',
    styleUrl: '../work.scss'
})
export class WorkSchoolComponent implements OnInit {

  data!: any[]

  private recycled: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const cachedData = sessionStorage.getItem('schoolData');
    if(cachedData && !cachedData.includes('"Internal Server Error"') && !cachedData.includes('"Forbidden"') && cachedData != 'null') {
      this.data = JSON.parse(cachedData);
      console.log('Using Cached Data');
      this.recycled = true;
    }
    else {
      this.fetchData();
    }
  }

  ngAfterViewInit(): void {
    if(this.recycled) {
      const dbversion = this.apiService.getDBVersion();
      if(this.data[0].dbVersion != dbversion) {
        this.fetchData();
      }
    }
  }

  private async fetchData() {
    this.apiService.getProjects_School()
    .then(data => {
      this.data = data
      sessionStorage.setItem('schoolData', JSON.stringify(this.data));  
    })
    .catch(error => {
      console.error('An error occured fetching school work: ', error);
      return null;
    })
  }

}