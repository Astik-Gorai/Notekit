import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoaderComponent } from '../../Features/loader/loader.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  isLoading = false;
  user = {
    name: '',
    email: '',
    password: '',
  };
  confirmPassword  ='';

  constructor(private authService: AuthService, private router: Router){

  }

  onSubmit() {
    if(!this.user.name || !this.user.email || !this.user.password || !this.confirmPassword){
      alert('Please Fill All the details')
    }
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    this.isLoading = true;

    this.authService.signup(this.user).subscribe({
      next: (response)=>{
        this.authService.saveToken(response.token);
        console.log('Signup successful', response);
        alert('SignUp SucessFull, Please Login')
        this.router.navigate(['my-space'])
        this.isLoading = false;
      },
      error: (err) => {
        alert('Signup Failed')
        this.isLoading = false;
        console.error('Signup failed', err);
      }
    })
    console.log('Signup Data:', this.user);
  }

  
}
