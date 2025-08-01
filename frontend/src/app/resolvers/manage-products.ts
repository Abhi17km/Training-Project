import { Injectable } from '@angular/core';
import { Product, ProductService } from '../services/product';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ManageProducts {
  constructor(private productserive:ProductService){}

   resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Product[]> {
    return this.productserive.getAllProducts();
  }
}
