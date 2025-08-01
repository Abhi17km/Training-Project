import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Productdetailsservice {
  private baseUrl:string="http://localhost:5157/api/Product/";
  constructor(private http: HttpClient) {}
  getProductById(productId: number) {
    // alert('fetching products'+productId);
    return this.http.get<any[]>(`${this.baseUrl}product/${productId}`);
  }
  searchProductsByName(name: string): Observable<any[]> {
    console.log("searchproducts"+`${this.baseUrl}search/${name}`);
    return this.http.get<any[]>(`${this.baseUrl}search/${name}`);
  }
  
}
