import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../services/api.service";
import { ImageDisplayComponent } from '../image-display/image-display.component'

@Component({
    selector: 'app-work-slider',
    templateUrl: './work-slider.component.html',
    styleUrls: ['./work-slider.component.scss'],
    imports: [CommonModule, ImageDisplayComponent],
    standalone: true,
    providers: [ApiService]
})


export class WorkSliderComponent implements OnInit, AfterViewInit {

    offset: number = 0;
    data: any[] = [];
    images: { imagePath: string, route: string, name: string }[] = [
        { imagePath: "../../assets/images/School/IMS_1.png", route: "/details/IMS", name: "Iventory Mangement Mobile" },
        { imagePath: "../../assets/images/School/DSA_1.png", route: "/details/DSA", name: "Data Structures & Algorithms Lab" },
        { imagePath: "../../assets/images/School/Trucking_1.png", route: "/details/TruckingDB", name: "Trucking Document Server" },
        { imagePath: "../../assets/images/Personal/portfolio_1.png", route: "/details/Portfolio", name: "Portfolio Website" },
        { imagePath: "../../assets/images/School/IMS_1.png", route: "/details/IMS", name: "Iventory Mangement Mobile" },
        { imagePath: "../../assets/images/School/DSA_1.png", route: "/details/DSA", name: "Data Structures & Algorithms Lab" },
        { imagePath: "../../assets/images/School/Trucking_1.png", route: "/details/TruckingDB", name: "Trucking Document Server" },
        { imagePath: "../../assets/images/Personal/portfolio_1.png", route: "/details/Portfolio", name: "Portfolio Website" },
    ]


    private intervalId: any = null;
    private recycled: boolean = false;
    private isPaused: boolean = false;



    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        // Assign the cached data
        const cachedData = sessionStorage.getItem('showcaseIDs');

        // If the data is still valid then use it
        // if(cachedData && !cachedData.includes('"Internal Server Error"') && !cachedData.includes('"Forbidden"') && cachedData != 'null') {
        //     this.data = JSON.parse(cachedData);
        //     this.recycled = true;
        // } 

        // // Else start the fetch process
        // else {
        //     this.fetchData();
        //     this.addImages();
        // }

        // Warn that the browser is not compatable
        if (typeof window === 'undefined' || !('requestAnimationFrame' in window)) {
            console.warn('requestAnimationFram is not available in this environment');
        }
    }

    // After the view is established
    ngAfterViewInit(): void {
        this.startSlider();

        // If data is reused
        // if (this.recycled) {
        //     // Check is the DB version is accurate
        //     const dbVersion = this.apiService.getDBVersion();
        //     if(this.data[0].dbversion != dbVersion) {
        //         // If not then fetch new data
        //         this.fetchData();
        //     }
        // }
    }

    // private addImages() {
    //     for( let image of this.data ) {                                                                 // This Places the initial pictures into the set
    //         this.images.push({ID: image._id, Name: image.projectName})
    //     }

    //     for(let i = 0; i < 4; i++) {                                                                    // This places 4 extra images at the end for a smooth transition
    //         this.images.push({ID: this.data[i]._id, Name: this.data[i].projectName})
    //     }
    // }

    // private fetchData() {
    //     this.apiService.getProjects_Showcase()
    //     .then(data => {
    //       this.data = data
    //       sessionStorage.setItem('showcaseIDs', JSON.stringify(this.data)); 
    //       this.addImages();
    //     })
    //     .catch(error => {
    //       console.error('An error occured fetching showcase Ids: ', error);
    //       return null;
    //     })
    // }

    startSlider() {
        if (this.intervalId) return;

        this.intervalId = setInterval(() => {
            if (!this.isPaused) {
                this.updateImageOffsets();
            }
        }, 8); // Runs at ~60fps (1000ms / 60 = ~16ms per frame);
    }

    updateImageOffsets() {
        this.offset -= 0.2;

        if (this.offset <= (this.images.length - 4) * -109.5) {
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
