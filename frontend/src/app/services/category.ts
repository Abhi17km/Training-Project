import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface CategoryItems {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class Category {
  private baseUrl:string="http://localhost:5157/api/Category/"
  
  constructor(private http: HttpClient) {}
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}GetAllCategories`);
  }
 
  
}
