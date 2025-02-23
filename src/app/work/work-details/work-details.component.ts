import { Component, OnInit, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { NavbarComponent } from '../../navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-work-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.scss'
})
export class WorkDetailsComponent implements OnInit, AfterViewInit {

  project!: any;
  projectId: any;
  images!: Map<string, SafeUrl>
  

  private recycled = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.apiService.getImageMap(this.projectId).subscribe(imageMap => {
      if (imageMap) {
        imageMap.forEach((SafeUrl, key) => {
        });

        this.images = imageMap;
      }
    })
  }

  async ngOnInit(): Promise<void> {
    const cachedData = sessionStorage.getItem(`details_${this.projectId}`);

    if(cachedData && !cachedData.includes('"Internal Server Error"') && !cachedData.includes('"Forbidden"') && cachedData != 'null') {
      this.project = JSON.parse(cachedData);
      console.log('Using Cached Data');
      this.recycled = true;
    }
    else {
      console.log('Fetching data');
      await this.fetchData();
    }



  }

  async ngAfterViewInit(): Promise<void> {
    if(this.recycled) {
      const dbVersion = this.apiService.getDBVersion();
      if(this.project.dbVersion !== dbVersion) {
        await this.fetchData();
      }
    }
  }

  private async fetchData(): Promise<void> {
    try{
      this.project = await this.apiService.getProjects_Details(this.projectId);
      this.project = this.project[0];
      sessionStorage.setItem(`details_${this.projectId}`, JSON.stringify(this.project))
    } catch (error) {
      console.error('An error occurred fetching project details', error);
    }
  }

}
