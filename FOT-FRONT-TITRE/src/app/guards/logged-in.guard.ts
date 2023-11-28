import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export function loggedInGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (oauthService.isAuth$.getValue()) {
      router.navigate(['/404'])
      return false;
    } else {
      return true
    }
  };
};
