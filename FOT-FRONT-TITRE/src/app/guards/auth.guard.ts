import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export function authGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (oauthService.isAuth$.getValue()) {
      return true;
    } else {
      router.navigate(['/404'])
      return false;
    }
  };
};
