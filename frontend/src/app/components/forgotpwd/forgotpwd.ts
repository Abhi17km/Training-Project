import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-forgotpwd',
  imports:[FormsModule,RouterModule,CommonModule],
  templateUrl: './forgotpwd.html',
  styleUrl: './forgotpwd.css'
})
// export class Forgotpwd {
//   showPasswordsection = false;
//   showOtpSection = false;

//   email: string | undefined;
//   otp: string | undefined;
//   newPassword: string | undefined;
//   passwordMismatch = false;
// confirmPassword: any;

//   constructor(
//     private auth: Auth,
//     private router: Router,
//     private route: ActivatedRoute,
//     private cdRef: ChangeDetectorRef
//   ) {}

//   onSendOtp() {
//     if (!this.email) {
//       alert('Email not found');
//       return;
//     }

//     this.showOtpSection = true;

//     this.auth.sendOtp(this.email).subscribe({
//       next: (res: { message: string; otp: string }) => {
//         console.log('OTP sent:', res.otp);
//         alert('OTP has been sent to your email successfully!');
//       },
//       error: (err) => {
//         console.error('Failed to send OTP:', err);
//         alert('Error sending OTP: ' + err.message);
//       },
//     });
//   }

//   onVerifyOtp() {
//     const requestData = {
//       email: this.email as string,
//       otp: this.otp as string,
//     };

//     this.auth.verifyOtp(requestData).subscribe({
//       next: (res) => {
//         alert('OTP verified, navigating to password section');
//         this.showOtpSection = false;
//         this.showPasswordsection = true;
//       },
//       error: (err) => {
//         console.error('OTP verification failed:', err);
//         alert('Invalid or expired OTP.');
//       },
//     });
//   }

//   onChange() {
//     if (!this.email || !this.newPassword) {
//       alert("Missing email or password.");
//       return;
//     }

//     const requestData = {
//       email: this.email,
//       password: this.newPassword,
//     };

//     this.auth.changepassword(requestData).subscribe({
//       next: (res) => {
//         alert('Password changed successfully!');
//         this.router.navigate(['/login']);
//       },
//       error: (err) => {
//         console.error('Password change failed:', err);
//         const backendErrors = err.error?.errors;
//         if (backendErrors) {
//           const messages = Object.entries(backendErrors).map(([field, msgs]: any) =>
//             `${field}: ${msgs.join(', ')}`).join('\n');
//           alert('Error:\n' + messages);
//         } else {
//           alert('Password change failed: ' + (err.message || 'Unknown error'));
//         }
//       },
//     });
//   }

//   onSubmit(form: NgForm) {
//     const { newPassword, confirmPassword } = form.value;
//     this.passwordMismatch = newPassword !== confirmPassword;

//     if (form.valid && !this.passwordMismatch) {
//       this.onChange();
//     }
//   }
// }

export class Forgotpwd {


  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    if (params['role']) {
      this.role = params['role'];
    }
  });
}


showPasswordsection:any;

  passwordMismatch = false;
showOtpSection=false;
  email: string ;
  otp: any;
  role:string;
  newPassword: string | undefined;
confirmPassword: any;
  
   constructor(private auth: Auth, private router: Router,private route:ActivatedRoute,private cdRef:ChangeDetectorRef) {
     this.email = '';
     this.role='';
   }
    onSendOtp() {
      // Call backend service to send OTP if needed
      
      if (!this.email) {
        alert('email not found');
        return;}
        this.showOtpSection = true;
       this.auth.sendOtp(this.email).subscribe({
        next: (res:{message:string,otp:string}) => {
         
          console.log('OTP sent:', res.otp);
          
          alert('OTP has been sent to your email successfully!');
          console.log("Navigating to OTP section...");
          
        },
        error: (err) => {
          console.error('Failed to send OTP:', err);
          alert('no email'+err.message);
        }

      });

    }
    onVerifyOtp() {
      
        const requestData = {
          email: this.email,
          otp: this.otp,
          // newPassword: this.newPassword
      };
      console.log('data',requestData.email,requestData.otp)
      this.auth.verifyOtp(requestData).subscribe({
          next: (res) => {
            console.log('otp verified success:', res,requestData.otp);
            alert('navigating to password section');
            this.showOtpSection=false;
            this.showPasswordsection= true;
            alert('navigating to password section'+this.showPasswordsection);
             this.cdRef.detectChanges();
          },
          error: (err) => {
            console.error('OTP verification failed:', err);
            // alert('Invalid OTP or expired.');
          }
      });

    }
    onChange() {
  if (!this.email || !this.confirmPassword) {
    alert("Missing email or password.");
    return;
  }

  const requestData = {
    email: this.email,
    NewPassword: this.confirmPassword
  };

  this.auth.changepassword(requestData).subscribe({
    next: (res) => {
      console.log('Password reset successful', res);
      alert('Password changed');
      this.router.navigate(['/login'], { queryParams: { role: this.role } });
    },
    error: (err) => {
      console.error('Password change failed:', err);
      alert('Failed to change password');
    }
  });
}


  onSubmit(form: NgForm) {
    if (form.valid) {

       const { newPassword, confirmPassword } = form.value;
  this.passwordMismatch = newPassword !== confirmPassword;

  if (form.valid && !this.passwordMismatch) {
    // TODO: Call backend API to change password
    console.log('Password changed successfully!');
      

    }
  }
}



}