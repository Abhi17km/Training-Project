import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Cartpageservice } from '../services/cartservice/cartpageservice';

@Injectable({
  providedIn: 'root'
})
export class CartpageResolver implements Resolve<any> {


   constructor(private cartService: Cartpageservice) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const user = JSON.parse(sessionStorage.getItem('user')!);
       const userId = Number(user.id);
      return this.cartService.getCartItemsByUserId(userId);
    }
  
  
}
