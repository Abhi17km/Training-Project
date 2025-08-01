import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtPayload } from 'jwt-decode';
import { Auth } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profilecomp',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './profilecomp.html',
  styleUrl: './profilecomp.css'
})
export class Profilecomp {
  constructor(private auth: Auth, private router: Router,private route:ActivatedRoute) {}
   
  editEmail = false;
  isEditingEmail = false;
  editedEmail = '';
  isEmailChanged = false;
      togglePassword() {
           this.showPassword = !this.showPassword;

      }
      editMode: { [key: string]: boolean } = {
            username: false,
            email: false,
            phone: false
      };
      enableEdit(field: string): void {
          this.editMode[field] = true;
      }
      
      anyFieldBeingEdited(): boolean {
        return Object.values(this.editMode).some(val => val);
      }

      saveChanges(): void {
        // Save to sessionStorage
        sessionStorage.setItem('user', JSON.stringify(this.user));

        const userData = sessionStorage.getItem('user');

        if (userData) {
            this.user = JSON.parse(userData); // ✅ convert string to object
            const uId = this.user.userId; 
            alert('User loaded from session:'+this.user.id);

            this.auth.updateUserProfile(this.user.id, this.user).subscribe({
              next: () => {
                // sessionStorage.setItem('user', JSON.stringify(this.user));
                alert('Profile updated!');  
              },
              error: err => {
                console.error(err);
                alert('Failed to update');
              }
          });
        } 
        // Reset edit mode
        for (let field in this.editMode) {
          this.editMode[field] = false;
        }

        alert('Profile updated!');
      }
  

 




   user: any;
   ngOnInit(){
      const token = sessionStorage.getItem('token');
      if (token) {
        const userData = sessionStorage.getItem('user');

        if (userData) {
            this.user = JSON.parse(userData); // ✅ convert string to object
            console.log('User loaded from session:', this.user);
        } 
        else {
            console.warn('User data not found in sessionStorage.');
        } 
      }
      else{
        alert('No token found. Please log in.');
      }
    }
    userForm!: FormGroup;
   
    formChanged = false;
    showPassword: boolean = false;

togglePasswordVisibility() {
 
}

   



  // user = {
  //   name: 'John Doe',
  //   username:'Johnn',
  //   email: 'john.doe@example.com',
  //   phone: '+91-9876543210',
  //   password: '123 Main St, New Delhi, India'
  // };
}


