import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const employeeGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const router = inject(Router);
  if (role == "employee") {
        return true;
  } else {
    if(token){
      router.navigate(['/dashboard']);
      return false;
    }
    else{
      router.navigate(['/*']); //NotFound component
      return false;
    }
  }
};
