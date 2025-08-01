import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  productId: number;
  productName: string;
  productDesc: string;
  productPrice: number;
  imageUrl: string;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5157/api/Product';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getallproducts`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/getproductbyid/${id}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/addproduct`, product);
  }

  updateProduct(productId: number, product: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateproduct/${productId}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteproduct/${id}`);
  }

}
