import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { GlobalStateService } from '../../global-state.service';
import { Router } from '@angular/router';
import { MyProfileService } from './my-profile.service';
import { LoaderComponent } from '../../Features/loader/loader.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  fullname: string =''
  email: string =''
  isLoading = true;

  constructor(private authService: AuthService, private globalStateService: GlobalStateService, private router : Router, private myProfileService: MyProfileService){

  }

  ngOnInit(): void {
      this.myProfileService.getMyDetails().subscribe({
        next: (data)=>{
          console.log(`Profile data`, data)
          this.fullname= data[0]?.name
          this.email = data[0]?.email
          this.isLoading = false
        },
        error:(err)=>{
          console.error(err)
        }
      })
  }

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

 logout(): void {
  this.authService.logout();
  this.globalStateService.clearState();
  this.router.navigate(['/login']);
}

}
