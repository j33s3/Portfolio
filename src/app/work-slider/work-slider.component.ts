import { Component, OnInit, ElementRef, AfterViewInit, ViewChild} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../services/api.service";
import { ImageDisplayComponent } from '../image-display/image-display.component' 

@Component({
    selector: 'app-work-slider',
    standalone: true,
    templateUrl: './work-slider.component.html',
    styleUrls: ['./work-slider.component.scss'],
    imports: [CommonModule, ImageDisplayComponent]
})



export class WorkSliderComponent implements OnInit, AfterViewInit {





    offset: number = 0;
    data: any[] = [];
    images: {ID: string, Name: string}[] = [];

    private rafId: number = 0;
    private isPaused: boolean = false;
    private windowW: number = window.innerWidth;
    private recycled: boolean = false;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        const cachedData = sessionStorage.getItem('showcaseIDs');
        
        if(cachedData && !cachedData.includes('"Internal Server Error"') && !cachedData.includes('"Forbidden"') && cachedData != 'null') {
            this.data = JSON.parse(cachedData);
            this.recycled = true;
        } else {
            this.fetchData();
            this.addImages();
        }


        if (typeof window === 'undefined' || !('requestAnimationFram' in window)) {                     // Warn that the browser is not compatable
            console.warn('requestAnimationFram is not available in this environment');
        }

    }

    private async fetchData() {
        this.apiService.getProjects_Showcase()
        .then(data => {
          this.data = data
          sessionStorage.setItem('showcaseIDs', JSON.stringify(this.data)); 
          this.addImages();
        })
        .catch(error => {
          console.error('An error occured fetching showcase Ids: ', error);
          return null;
        })
      }






    addImages() {


        for( let image of this.data ) {                                                                 // This Places the initial pictures into the set
            this.images.push({ID: image._id, Name: image.projectName})
        }

        for(let i = 0; i < 4; i++) {                                                                    // This places 4 extra images at the end for a smooth transition
            this.images.push({ID: this.data[i]._id, Name: this.data[i].projectName})
        }

    }

    //**   Animation   **//

    ngAfterViewInit(): void {                                                                           // Once view is loaded start the slider
        this.startSlider();

        if(this.recycled) {
            const dbversion = this.apiService.getDBVersion();
            if(this.data[0].dbVersion != dbversion) {
            this.fetchData();
            }
        }
          
    }



    startSlider() {                                                                                     
        const updateImages = () => {                                                                    // recursivly calls the updateImagesOffset untill hover
            if(this.isPaused) return;
            this.updateImagesOffsets();
            this.rafId = requestAnimationFrame(updateImages);
        };
        updateImages();
    }

    updateImagesOffsets() {
        




        this.images = this.images.map((image) => {                                                      // Set the offset and if it is greater, move frame to beggining
            this.offset -= 0.05;
            
            // if (this.offset <= (this.images.length - 4) * -108.5) {
            //     this.offset = 0;
            // }

            if (this.offset <= (this.images.length - 4) * -109.5) {
                this.offset = 0;
            }

            return image;
        });
    }


    pauseSlider() {
        if (this.rafId) {                                                                               // Cancel the animation and set status to paused
            cancelAnimationFrame(this.rafId);
            this.rafId = 0;
        }
        this.isPaused = true;
    }

    resumeSlider() {                                                                                    // Set status to playing and call the startSlider function again
        this.isPaused = false;
        this.startSlider();
    }


    ngOnDestroy(): void {                                                                               // Reset Contents to clear memory
        if(this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
    }
}