import { Component, OnInit, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component'; 
import { ApiService } from '../../services/api.service';
import { ImageDisplayComponent } from '../../image-display/image-display.component';

@Component({
    selector: 'app-work-work',
    imports: [CommonModule, NavbarComponent, ImageDisplayComponent],
    standalone: true,
    templateUrl: './work-work.component.html',
    styleUrl: '../work.scss'
})
export class WorkWorkComponent implements OnInit, AfterViewInit{

  data: any[] = []

  private recycled: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const cachedData = sessionStorage.getItem('professionalData');
    
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
      const dbVersion = this.apiService.getDBVersion();
      if(this.data[0].dbVersion != dbVersion) {
        this.fetchData()
      }
    }
  }

  private async fetchData() {
    this.apiService.getAbout()
      .then(data => {
        this.data = data;
        sessionStorage.setItem('professionalData', JSON.stringify(this.data));
      })
      .catch(error => {
        console.error('An error occured fetching professional work: ', error);
        return null;
      })
  }

}
