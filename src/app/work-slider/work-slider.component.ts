import { Component, OnInit} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-work-slider',
    standalone: true,
    templateUrl: './work-slider.component.html',
    styleUrls: ['./work-slider.component.scss'],
    imports: [CommonModule]
})



export class WorkSliderComponent implements OnInit {
    images = [                                                                                          // List of images
        { path: 'SliderDefault.jpg', offset: 0},
        { path: 'SliderDefault.jpg', offset: 0},
        { path: 'SliderDefault.jpg', offset: 0},
        { path: 'SliderDefault.jpg', offset: 0},
        { path: 'SliderDefault.jpg', offset: 0},
        { path: 'SliderDefault.jpg', offset: 0}
    ];

    private rafId: number = 0;
    private isPaused: boolean = false;

    constructor() { }

    ngOnInit(): void {
        if (typeof window === 'undefined' || !('requestAnimationFram' in window)) {                     // Warn that the browser is not compatable
            console.warn('requestAnimationFram is not available in this environment');
        }

    }

    ngAfterViewInit(): void {                                                                           // Once view is loaded start the slider
        this.startSlider();
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
            image.offset -= 0.2;
            if (image.offset <= -109) {
                image.offset = 0;
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

