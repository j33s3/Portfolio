import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../services/api.service";
import { ImageDisplayComponent } from '../image-display/image-display.component' 

@Component({
    selector: 'app-work-slider',
    standalone: true,
    templateUrl: './work-slider.component.html',
    styleUrls: ['./work-slider.component.scss'],
    imports: [CommonModule, ImageDisplayComponent],
    providers: [ApiService]
})



export class WorkSliderComponent implements OnInit, AfterViewInit{

    offset: number = 0;
    data: any[] = [];
    images: {ID: string, Name: string}[] = []

    private intervalId: any = null;
    private recycled: boolean = false;
    private isPaused: boolean = false;
    


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

    ngAfterViewInit(): void {
        this.startSlider();

        if (this.recycled) {
            const dbVersion = this.apiService.getDBVersion();
            if(this.data[0].dbversion != dbVersion) {
                this.fetchData();
            }
        }
    }

    private addImages() {
        for( let image of this.data ) {                                                                 // This Places the initial pictures into the set
            this.images.push({ID: image._id, Name: image.projectName})
        }

        for(let i = 0; i < 4; i++) {                                                                    // This places 4 extra images at the end for a smooth transition
            this.images.push({ID: this.data[i]._id, Name: this.data[i].projectName})
        }
    }

    private fetchData() {
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

    startSlider() {
        if(this.intervalId) return;

        this.intervalId = setInterval(() => {
            if(!this.isPaused) {
                this.updateImageOffsets();
            }
        }, 8); // Runs at ~60fps (1000ms / 60 = ~16ms per frame);
    }

    updateImageOffsets() {
        this.offset -= 0.3;

        if (this.offset <= (this.images.length -4) * -109.5) {
            this.offset = 0;
        }
    }

    pauseSlider() {
        this.isPaused = true;
    }

    resumeSlider() {
        this.isPaused = false;
    }

}
