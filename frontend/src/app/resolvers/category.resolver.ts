import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Category, CategoryItems } from '../services/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<Category[]> {

  constructor(private categoryService: Category) {}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Category[]> {
    return this.categoryService.getCategories();
  }
}

