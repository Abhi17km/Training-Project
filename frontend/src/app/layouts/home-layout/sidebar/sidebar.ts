
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
   @Output() close = new EventEmitter<void>();
  role: any;

  constructor(private router: Router) {
     this.role='';
  }

  logout() {
    sessionStorage.removeItem('token'); // or however you're managing auth
     this.router.navigate(['/login'], { queryParams: { role: this.role } });
  }
}
