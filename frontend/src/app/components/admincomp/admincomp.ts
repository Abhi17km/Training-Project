import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admincomp',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './admincomp.html',
  styleUrl: './admincomp.css'
})
export class Admincomp {

  role:any;
  constructor(private router: Router) {
    this.role='';
  }

  goToProducts() {
    this.router.navigate(['/admin/products']);
  }

  goToCategories() {
    this.router.navigate(['/admin/categories']);
  }

  goToOrders() {
    this.router.navigate(['/admin/orders']);
  }

  goToCustomers() {
    this.router.navigate(['admin/customers']);
  }

  logout() {
    sessionStorage.removeItem('token'); // or however you're managing auth
     this.router.navigate(['/login'], { queryParams: { role: this.role } });
    alert("Logged out");
  }
}
