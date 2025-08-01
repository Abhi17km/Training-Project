import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface OrderItemDTO {
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  productName: string;
  deliveryStatus:string;
}
@Injectable({
  providedIn: 'root'
})
export class Orderspageservice {
  private apiUrl:string="http://localhost:5157/api/OrderItem/";

  constructor(private http: HttpClient) { }

  getOrderItemsByUser(userId: number): Observable<OrderItemDTO[]> {
    const url = `${this.apiUrl}Getorderitembyuser/${userId}`;
    return this.http.get<OrderItemDTO[]>(url);
  }
}
