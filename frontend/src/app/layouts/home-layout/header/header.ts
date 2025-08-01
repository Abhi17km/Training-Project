import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Productdetailsservice } from '../../../services/productdetailsservice/productdetailsservice';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  searchTerm: string = '';

  constructor(private prodservice:Productdetailsservice,private router: Router){}
    onSearch(searchTerm: string) {
      const trimmed = searchTerm.trim();
       if (!trimmed) return;

       this.router.navigate(['/home-layout/search'], {
        queryParams: { searchTerm: trimmed }
      });

      

     console.log("outside if :'/home-layout/search/"+searchTerm);

      }
 @Output() search: EventEmitter<string> = new EventEmitter<string>();
 
  
 @Output() toggleSidebar = new EventEmitter<void>();
  user: any;



  onToggleSidebar() {
    this.toggleSidebar.emit(); // Emit event to HomeLayout
  }
  ngOnInit(){
     const userData = sessionStorage.getItem('user');

        if (userData) {
            this.user = JSON.parse(userData); // ✅ convert string to object
            console.log('User loaded from session:', this.user.username);
        } 
  }

}
