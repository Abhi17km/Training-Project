import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  orderId: number;
  userId: number;
  orderDate: string;
  totalAmount: number;
  deliveryStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5157/api/Order';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/getallorders`);
  }

  updateOrderStatus(orderId: number, deliveryStatus: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateorderstatus`, {
      orderId,
      deliveryStatus
    });
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteorder/${orderId}`);
  }
}
