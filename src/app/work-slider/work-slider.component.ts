import { Component, OnInit, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-work-slider',
    standalone: true,
    templateUrl: './work-slider.component.html',
    styleUrls: ['./work-slider.component.scss'],
    imports: [CommonModule]
})



export class WorkSliderComponent implements OnInit {
    images = [
        { path: 'SliderDefault.jpg', offset: 0},
        { path: 'SliderDefault.jpg', offset: 0},
        { path: 'SliderDefault.jpg', offset: 0},
        { path: 'SliderDefault.jpg', offset: 0},
        { path: 'SliderDefault.jpg', offset: 0},
        { path: 'SliderDefault.jpg', offset: 0}
    ];

    gap = 1;
    imageWidth = 33.3333;
    intervalId: any;

    constructor() { }

    ngOnInit(): void {
        this.startSlider();
    }

    startSlider() {
        this.intervalId = setInterval(() => {
            this.images.forEach((image, index) => {
                image.offset -= (0.5 + this.gap / 100);
                if (image.offset <= -109) {
                    image.offset = 0;
                }
            });
        }, 20); // Update every 20ms for smooth scrolling
    }

    pauseSlider() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    resumeSlider() {
            this.startSlider();
    }
}