import { Injectable } from '@angular/core';
import { Order, OrderService } from '../services/order';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewOrders {
  constructor(private orderService: OrderService ){}

   resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Order[]> {
    return this.orderService.getAllOrders();
  
    


}
}
