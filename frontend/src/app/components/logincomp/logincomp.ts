import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { HomeLayout } from '../../layouts/home-layout/home-layout';

@Component({
  selector: 'app-logincomp',
  templateUrl: './logincomp.html',
  imports:[FormsModule,RouterModule,CommonModule,HomeLayout],
  standalone:true,
  styleUrls: ['./logincomp.css'] // ✅ 'styleUrls' not 'styleUrl'
})
export class Logincomp {
  protected readonly showPopup = signal(false);
  private popupTimeout: any; // To store the timeout ID for cleanup
  
  loginData = {
    email: '',
    password: ''
  };
  constructor(private auth: Auth, private router: Router,private route:ActivatedRoute) {}
  openPopup(): void {
    // 1. Clear any existing timeout first, in case the button is clicked multiple times quickly
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout);
    }

    // 2. Show the pop-up
    this.showPopup.set(true);

  }
   closePopup(): void {
    // Clear the timeout if the pop-up is closed manually before the 5 seconds are up
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout);
      this.popupTimeout = null; // Reset it
    }
    this.showPopup.set(false);
  }
  onSubmit(form: NgForm) {
    if (form.valid) {

       this.route.queryParams.subscribe(params => {
      const role = params['role'];

      this.auth.login(this.loginData, role).subscribe({
  next: res => {
    if (role === 'admin') {
      alert('Welcome Admin');
      // this.router.navigate(['/admin']);
      this.showPopup.set(true);
      this.popupTimeout = setTimeout(() => {
              this.showPopup.set(false);
              this.router.navigate(['/admin']);
              this.popupTimeout = null;
            }, 1500);
       sessionStorage.setItem('admin',JSON.stringify(res.admin));
    } else {
      // alert('Welcome User');
       this.showPopup.set(true);
      this.popupTimeout = setTimeout(() => {
              this.showPopup.set(false);
              this.router.navigate(['/home-layout/home']);
              this.popupTimeout = null;
            }, 1500);
      sessionStorage.setItem('user',JSON.stringify(res.user));
      // this.router.navigate(['/home-layout/home']);

    }
  },
  error: err => {
    alert('Login failed');
    console.error(err);
  }
});

    });
      
    //  this.auth.login(this.loginData,role).subscribe({
    //   next: (res) => {
    //     alert('Login successful');

    //     this.route.queryParams.subscribe(params => {
         
    //       if (role === 'admin') {
    //         alert('Welcome admin');
    //       } else {
    //         alert('Welcome user');
    //       }
    //     });
    //   },
    //     error:(err)=>{
          
    //       alert('Login Failed'+err.Error)
    //       alert('Login details'+" "+JSON.stringify(form.value)+" "+this.loginData.password)
    //     }
    //   });
    }
  }
}
