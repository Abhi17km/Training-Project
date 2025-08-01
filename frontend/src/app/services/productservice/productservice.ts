import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Productservice {
   private baseUrl:string="http://localhost:5157/api/Product/";
   
    constructor(private http: HttpClient) {}

    getProductsByCategory(categoryId: Number): Observable<any[]> {
      // alert('category id'+categoryId);
      return this.http.get<any[]>(`${this.baseUrl}category/${categoryId}`);
    }
    
  
}
