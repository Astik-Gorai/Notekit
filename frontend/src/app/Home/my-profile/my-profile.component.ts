import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  isEditMode = false;

  userProfile = {
    fullName: 'Astik Gorai',
    email: 'astik@example.com',
    role: 'Backend Developer',
    location: 'Kolkata, India',
    bio: 'Passionate about scalable backend systems and clean architecture.'
  };

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile() {
    // API call placeholder
    this.isEditMode = false;
    console.log('Profile saved:', this.userProfile);
  }
}
