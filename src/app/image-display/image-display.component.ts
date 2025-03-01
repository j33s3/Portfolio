import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-display.component.html'
})
export class ImageDisplayComponent implements OnInit{
  @Input() parentId!: string;
  @Input() imageId!: string;      // Is the Id for the image
  @Input() imageType!: string;    // Dictates Projects || About
  @Input() importStyle: { [key: string]: string } = {};
  @Input() isShowcase: boolean = false; 
  imageUrl!: SafeUrl;


  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    try{
      const blob = this.imageType == 'projects' ? await this.apiService.getProjects_Image(this.imageId) : await this.apiService.getAbout_Image(this.imageId);
      this.imageUrl = blob;
    } catch (error) {
      console.error("Error fetching image: ", error);
    }
  }
}
