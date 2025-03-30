import { Component, OnInit, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../services/api.service'; 
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { After } from 'node:v8';



@Component({
    selector: 'app-about',
    imports: [CommonModule, NavbarComponent, ImageDisplayComponent],
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit{

  data: any

  private recycled: boolean = false;

  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
    const cachedData = sessionStorage.getItem('aboutData');
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
    this.apiService.getAbout()
    .then(data => {
      this.data = data[0]
      sessionStorage.setItem('aboutData', JSON.stringify(this.data));  
    })
    .catch(error => {
      console.error('An error occured fetching about data ', error);
      return null;
    })
  }

}
