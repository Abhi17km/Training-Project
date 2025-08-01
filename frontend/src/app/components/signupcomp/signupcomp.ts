import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-signupcomp',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './signupcomp.html',
  standalone:true,
  styleUrl: './signupcomp.css'
})
export class Signupcomp {
  protected readonly showPopup = signal(false);
  private popupTimeout: any; // To store the timeout ID for cleanup
  signupData={
    username:'',
    email:'',
    password:'',
    phone:''
  }
   constructor(private auth: Auth, private router: Router) {
    // this.router.navigate(['/login'], { queryParams: { role: 'admin' } });
   }
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
  get phoneDigitsLeft(): number {
    return 10 - this.signupData.phone.length;
  }
  get passwordErrors(): string[] {
    const errors = [];
    const pwd = this.signupData.password;

    if (pwd.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(pwd)) errors.push('At least one uppercase letter');
    if (!/[0-9]/.test(pwd)) errors.push('At least one number');
    if (!/[@$!%*?&]/.test(pwd)) errors.push('At least one special character');

    return errors;
  }
   onSubmit(form: NgForm) {
    if (form.valid) {
      
      // TODO: Send data to .NET Core backend using HTTP POST
      // alert( JSON.stringify(form.value))
      this.auth.signup(form.value).subscribe({
  next: (res) => {
    alert('Signup successful');
    form.resetForm();
    this.showPopup.set(true);
      this.popupTimeout = setTimeout(() => {
              this.showPopup.set(false);
              this.router.navigate(['/login'], { queryParamsHandling: 'preserve' });
              this.popupTimeout = null;
            }, 1500);
    


  },
  error: (err) => {
    console.error('Signup error:', err);
    alert('Signup failed: ' + (err?.error?.message || err?.message || 'Unknown error'));
  }
});

    }
  }

}
