import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  ngOnInit(): void {

    // add an event listener to the form when pressing submit
    const form = document.getElementById('contactForm') as HTMLFormElement;
    form?.addEventListener('submit', async (event) => {
    event.preventDefault();

      // Fetch items from the form
      const name = (document.getElementById('name') as HTMLInputElement)?.value;
      const email = (document.getElementById('email') as HTMLInputElement)?.value;
      const message = (document.getElementById('message') as HTMLInputElement)?.value;
      form.reset();


      // try {
      //   // Post a request and send the body
      //   const response = await fetch (
      //     `${this.baseUrl}/contact`, {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ name, email, message })
      //     }
      //   );

      //   // Track the response
      //   const result = await response.json();
        

      //   // If success notify, else notify error
      //   if(response.ok) {
      //     alert('Message sent successfully!');
      //   } else {
      //     alert('Error: ' + result.error);
      //   }
      // } catch (error) {
      //   console.error('Request failed: ', error);
      //   alert('Something went wrong. Please try again.')
      // }
    });
  }
}
