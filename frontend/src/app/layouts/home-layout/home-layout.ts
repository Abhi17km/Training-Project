import { Component } from '@angular/core';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [Header, Sidebar, Footer, RouterModule,CommonModule],
  templateUrl: './home-layout.html',
  styleUrls: ['./home-layout.css']
})
export class HomeLayout {
   sidebarVisible = true;

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
    console.log('sidebar',this.sidebarVisible);
  }

  closeSidebar(): void {
    this.sidebarVisible = false;
  }
}
