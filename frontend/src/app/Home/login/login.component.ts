import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { GlobalStateService } from '../../global-state.service';
import { LoaderComponent } from '../../Features/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, LoaderComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(private readonly authService: AuthService, private router: Router, private globalStateService: GlobalStateService){

  }
  existingUser: any
ngOnInit(): void {
    this.existingUser = this.globalStateService.getState();
}
  user= {
    password: '',
    email: ''
  }

  onSubmit(){
    this.isLoading = true;
    if(!this.user.email || !this.user.password){
      alert('Please Fill all the details')
    }
    this.authService.login(this.user).subscribe({
      next: (response)=>{
        this.authService.saveToken(response.token)
        this.router.navigate(['/my-space'])
        console.log(`Login Sucessfull`)
        this.isLoading = false;
        this.globalStateService.updateState({user: {email:this.user.email}})
      },
      error: (err)=>{
        alert(`Login Failed`);
        console.error(err);
        this.isLoading = false;
      }
    })
    console.log(this.user);
  }



}
