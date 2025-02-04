import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../services/api.service'; 
import { ImageDisplayComponent } from '../image-display/image-display.component';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ImageDisplayComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{

  data: any[] = []

  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
    // const cachedData = sessionStorage.getItem('aboutData');
    // if (cachedData) {
    //   this.data = JSON.parse(cachedData);
    // } else {
    //   this.fetchData();
    // }

    this.apiService.getAbout()
      .then(data => {
        this.data = data;
        console.log(data);
        sessionStorage.setItem('aboutData', JSON.stringify(this.data));
      })
      .catch(error => {
        console.error('There was an error fetching about: ', error);
      })
    


  }
}
