import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  features = [
    {
      title: 'Organize Notes',
      description: 'Easily create, and manage your notes with intuitive tools.'
    },
    {
      title: 'Sync Across Devices',
      description: 'Access your notes anytime, anywhere with seamless cloud synchronization.'
    },
    {
      title: 'Share your notes ',
      description: 'Share notes with your all of the users'
    },
    {
      title: 'Full Authentication Provided',
      description: 'Fully secured with JWT token'
    }
  ];
}