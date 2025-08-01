import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

// http://localhost:5024/api/Category

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5157/api/Category'; // 🔁 Replace with your actual API if different

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/GetAllCategories`);
  }

  addCategory(category: { categoryName: string }): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/AddCategory`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteCategory/${id}`);
  }
  
}

