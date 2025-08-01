import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cartpageservice {
  private baseUrl:string="http://localhost:5157/api/CartItem/";
  
   constructor(private http: HttpClient) {}
   getCartItemsByUserId(userId: number) {
    // alert('fetching products'+productId);
    return this.http.get<any[]>(`${this.baseUrl}GetCartItemsByUser/${userId}`);
  }
  addtoCartService(data:any){
     return this.http.post(`${this.baseUrl}addToCart`,data);
  }
  placeOrder(userId: number) {
  return this.http.post(`http://localhost:5157/api/CartItem/placeOrder/${userId}`, {});
}
  updateCartQuantity(cartId: number, quantity: number) {
       return this.http.put(
    `http://localhost:5157/api/CartItem/updateCartItem/${cartId}?quantity=${quantity}`,
    {} // empty body
  );
  }





}
