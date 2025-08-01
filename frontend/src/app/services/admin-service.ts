import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl:string="http://localhost:5157/api/Admin/customers"

  constructor(private http:HttpClient){}

  //  getAllCustomers(): Observable<Customer[]> {
  //     return this.http.get<Customer[]>(`${this.baseUrl}/getallcustomers`);
  //   }
}
