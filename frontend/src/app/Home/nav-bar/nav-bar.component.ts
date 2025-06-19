import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalStateInterface, GlobalStateService } from '../../global-state.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {

  menuOpen = false;



    constructor(private globalStateService: GlobalStateService, private authService: AuthService, private router: Router){

    }
    existingUser: GlobalStateInterface | null = null;
  private subscription: Subscription | null = null;
  private isLoggedIn!: boolean;
  private subscription2: Subscription | null = null;
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
   ngOnInit(): void {
    this.subscription = this.globalStateService.state.subscribe((state) => {
      // if (this.authService.isLoggedIn()) {
      //   this.existingUser = state;
      // } else {
      //   this.existingUser = { user: null };
      //   // this.globalStateService.clearState();
      //   this.authService.logout();
      // }
      this.existingUser = state
    });
    
  }
    ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  logout(): void {
    this.authService.logout();
    this.globalStateService.clearState();
    this.router.navigate(['/login']);
  }
}
