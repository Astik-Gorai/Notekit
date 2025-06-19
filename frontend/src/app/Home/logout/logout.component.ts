import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GlobalStateService } from '../../global-state.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{
  constructor(private router: Router, private authService: AuthService, private globalStateService: GlobalStateService){

  }

  ngOnInit(): void {
      this.authService.logout();
      this.globalStateService.clearState();
      this.router.navigate(['/login'])
  }
}
