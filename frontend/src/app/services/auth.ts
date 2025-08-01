import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl:string="http://localhost:5157/api/Customers/"

  constructor(private http:HttpClient){}
  signup(userobj:any){

    return this.http.post<any>(`${this.baseUrl}register`,userobj)
  }

  login(loginobj: any,role:string) {
    return this.http.post<any>(`${this.baseUrl}login?role=${role}`, loginobj).pipe(
      tap(res => {
        // ✅ Correct: this is a function, not an object
        sessionStorage.setItem('token', res.token);
      })
    );
  }

  sendOtp(email: string) {
    return this.http.post<{ message: string; otp: string }>(`${this.baseUrl}verify-otp?email=${email}`, null, {
     
    });
  }

  verifyOtp(data: { email: string; otp: string;}) {
    console.log(data);
    return this.http.post(`${this.baseUrl}otpcheck`, data);
  }
  changepassword(data:{email:string,NewPassword:string}){
    return this.http.post(`${this.baseUrl}reset-password`,data);
  }

  updateUserProfile(userId: number, userData: any): Observable<any> {
    if (userId == undefined){
      alert('user id undefined'+userId)
    }
    return this.http.put(`${this.baseUrl}updateprofile/${userId}`, userData);
    // http://localhost:5157/api/Customers/updateprofile/2
  }


  
}
