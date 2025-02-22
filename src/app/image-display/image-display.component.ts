import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-display',
  standalone: true,
  imports: [CommonModule],
  template: '<img *ngIf="imageUrl" [src]="imageUrl" alt="Fetched Image" [ngStyle]="importStyle">'
})
export class ImageDisplayComponent implements OnInit{
  @Input() parentId!: string;
  @Input() imageId!: string;      // Is the Id for the image
  @Input() imageType!: string;    // Dictates Projects || About
  @Input() importStyle: { [key: string]: string } = {};
  @Input() isShowcase: boolean = false; 
  imageUrl: SafeUrl | null = null;



  get fullImageUrl(): string {
    return `http://localhost:4000/prod/projects/image/${this.imageUrl}`
  }

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    this.imageUrl = this.apiService.getImage(this.imageId);
    console.log(`this is the image URL ${this.imageUrl}`);
    console.log(`this is the image ID ${this.imageId}`);


  }

  // async ngOnInit() {
  //   try{
  //     const blob = this.imageType == 'projects' ? await this.apiService.getProjects_Image(this.imageId) : await this.apiService.getAbout_Image(this.imageId);
  //     if(this.imageType == 'details') {
  //       this.imageUrl = await this.apiService.getAllProject_Images(this.imageId);
  //     }
  //     else if (this.imageType == 'projects') {
  //       this.imageUrl = await this.apiService.getProjects_Image(this.imageId);
  //     }
  //     else if (this.imageType == 'about') {
  //       this.imageUrl = await this.apiService.getAbout_Image(this.imageId);
  //     } else {
  //       console.error('Could not processes the request type')
  //     }
  //   } catch (error) {
  //     console.error("Error fetching image: ", error);
  //   }
  // }
}
