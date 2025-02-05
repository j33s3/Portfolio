import { Component, OnInit, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { NavbarComponent } from '../../navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { ImageDisplayComponent } from '../../image-display/image-display.component';

@Component({
  selector: 'app-work-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ImageDisplayComponent],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.scss'
})
export class WorkDetailsComponent implements OnInit, AfterViewInit {

  project: any;

  private recycled = false

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const cachedData = sessionStorage.getItem('showcaseIDs')
    
    if(cachedData && !cachedData.includes('"Internal Server Error"') && !cachedData.includes('"Forbidden"')) {
      this.project = JSON.parse(cachedData);
      console.log('Using Cached Data');
      this.recycled = true;
    }
    else {
      this.fetchData();
    }



    const projectId = this.route.snapshot.paramMap.get('id');
    if(projectId) {
      this.apiService.getProjects_Details(projectId)
        .then(data => {
          this.project = data
          sessionStorage.setItem('showcaseIDs', JSON.stringify(this.project));
        })
        .catch(error => {
          console.error('An error occured fetching details: ', error);
        })
    }

  }

  ngAfterViewInit(): void {
    if(this.recycled) {
      const dbVersion = this.apiService.getDBVersion();
      if(this.project.dbVersion == dbVersion) {
        this.fetchData();
      }
    }
  }

  private async fetchData() {
    this.apiService.getAbout()
      .then(data => {
        this.project = data
        sessionStorage.setItem('showcaseIDs', JSON.stringify(this.project));
      })
      .catch(error => {
        console.error('An error occured fetching project details ', error);
        return null;
      })
  }

}
