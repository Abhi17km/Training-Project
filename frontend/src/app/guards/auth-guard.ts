import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
  
  const isLoggedIn = sessionStorage.getItem('token'); 
  // alert(isLoggedIn);

  if (!isLoggedIn) {
    router.navigate(['/']); // Redirect to login
    return false;
  }
  return true;
};



