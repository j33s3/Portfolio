import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-work-personal',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './work-personal.component.html',
  styleUrl: './work-personal.component.scss'
})


export class WorkPersonalComponent implements OnInit {

    data: any[] = [];

    ngOnInit(): void {
      this.fetchData();
    }










    fetchData(): void {
      const projectsPage = 'http://localhost:3000/api/projects/personal/';
      
      fetch(projectsPage)
      .then(response => {
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json();
      })
      .then(data => {
        this.data = data;
        sessionStorage.setItem('projectData', JSON.stringify(this.data));
      })
      .catch(error => {
        console.error('Error fetching data', error);
      })
      
    }
  // ngOnInit(): void {
  //   // Select the vertical line element
  //   const verticalLine = document.querySelector('.vertical-container') as HTMLElement;

  //   // Listen to the scroll event
  //   window.addEventListener('scroll', () => {
  //     const scrollPosition = window.scrollY + window.innerHeight;
  //     console.log(scrollPosition);

  //     // Update the height of the vertical line
  //     if (verticalLine) {
  //       verticalLine.style.height = `${scrollPosition}px`;
  //     }
  //   });
  // }
}





// export class WorkPersonalComponent implements AfterViewInit{

//   constructor() {}

//   ngAfterViewInit(): void {
//     const circles = document.querySelectorAll('.circle-break');
//     const verticalLine = document.querySelector('.vertical-line') as HTMLElement;
  
//     window.addEventListener('scroll', () => {
//       const scrollPosition = window.scrollY + window.innerHeight;
  
//       if(verticalLine) {
//         verticalLine.style.height = `${scrollPosition}px`
//       }
  
//       circles.forEach((circle: Element) => {
//         const circlePosition= circle.getBoundingClientRect().top + window.scrollY + circle.clientHeight / 2;
  
//         if(scrollPosition > circlePosition - 10 && scrollPosition < circlePosition + 10) {
//           circle.classList.add('filled');
//         } else {
//           circle.classList.remove('filled');
//         }
  
//       })
//     })
//   }


// }
