import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('authToken');

  const modifiedReq = authToken? req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  }):req;

  return next(modifiedReq)

  
};
