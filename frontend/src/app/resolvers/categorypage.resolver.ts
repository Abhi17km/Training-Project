import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Productdetailsservice } from '../services/productdetailsservice/productdetailsservice';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorypageResolver implements Resolve<any>  {

    constructor(private productService: Productdetailsservice) {}
    
    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {
          const productId = Number(route.paramMap.get('id'));
        return this.productService.getProductById(productId).pipe(
          catchError(error => {
            console.error('Error in resolver:', error);
            return of(null);
          })
        );
    }

}
