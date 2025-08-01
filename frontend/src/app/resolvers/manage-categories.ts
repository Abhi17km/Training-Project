import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { CategoryService } from '../services/mcategory';


@Injectable({
  providedIn: 'root'
})
export class ManageCategories {
   constructor(private Categoryservice:CategoryService){}
  
     resolve(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<Category[]> {
      return this.Categoryservice.getAllCategories();
    }
}
