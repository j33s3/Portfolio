import { Component, OnInit, AfterViewInit} from '@angular/core';
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


export class WorkPersonalComponent implements OnInit, AfterViewInit {

  private recycled: boolean = false

  data: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const cachedData = sessionStorage.getItem('personalData');
    if(cachedData && !cachedData.includes('"Internal Server Error"') && !cachedData.includes('"Forbidden"')) {
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
    this.apiService.getProjects_Personal()
    .then(data => {
      this.data = data
      sessionStorage.setItem('personalData', JSON.stringify(this.data));  
    })
    .catch(error => {
      console.error('An error occured fetching personal work: ', error);
      return null;
    })
  }

}
