import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '../../services/order';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  imports:[RouterModule,CommonModule,FormsModule],
  templateUrl: './admin-orders.html',
  styleUrls: ['./admin-orders.css']
})
export class AdminOrdersComponent implements OnInit {
updateStatus(_t23: Order,arg1: string) {
throw new Error('Method not implemented.');
}
  orders: Order[] = [];
  loading = true;
  errorMessage = '';
error: any;

  constructor(private orderService: OrderService,private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.orders = this.route.snapshot.data['orders'] ?? [];
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load orders';
        console.error('Order fetch failed:', err);
        this.loading = false;
      }
    });
  }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.orderId !== orderId);
          location.reload();
        },
        error: (err) => {
          alert('Failed to delete order');
          console.error(err);
        }
      });
    }
  }
}
