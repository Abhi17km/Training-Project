// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { ActivatedRoute } from '@angular/router';

// import { Auth } from '../../../services/auth';
// import { Customer } from '../../../models/customer';


// @Component({
//   selector: 'app-admin-customers',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './admin-customers.html',
//   styleUrl: './admin-customers.css'
// })
// export class AdminCustomersComponent implements OnInit {
//   customers: Customer[] = [];

//   constructor(private customerService: CustomerService,private route:ActivatedRoute) {}

//   ngOnInit(): void {
//     // this.customers = this.route.snapshot.data['customersview']
//     this.customerService.getAllCustomers().subscribe({
//       next: (data) => this.customers = data,
//       error: (err) => console.error('Error loading customers:', err)
//     });
//   }
// }






