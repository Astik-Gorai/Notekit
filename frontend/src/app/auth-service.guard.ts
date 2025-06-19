import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './Home/auth.service';
import { GlobalStateService } from './global-state.service';

export const authServiceGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const globalStateService = inject(GlobalStateService);
  const router = inject(Router);

  if(authService.isLoggedIn())
    return true;
  router.navigate(['/login']);
  return false;
};
