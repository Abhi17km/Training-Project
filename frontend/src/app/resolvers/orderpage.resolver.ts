import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Orderspageservice } from '../services/orderpageservice/orderspageservice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderpageResolver  implements Resolve<any> {

  constructor(private orderService: Orderspageservice) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
    const user = JSON.parse(sessionStorage.getItem('user')!);
    const userId = Number(user.id);
    return this.orderService.getOrderItemsByUser(userId);
    
  }
  
  
}
