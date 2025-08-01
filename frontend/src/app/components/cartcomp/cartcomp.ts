import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartpageservice } from '../../services/cartservice/cartpageservice';

@Component({
  selector: 'app-cartcomp',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './cartcomp.html',
  styleUrl: './cartcomp.css'
})
export class Cartcomp {
cartItems: any[] = [];
  constructor(private route: ActivatedRoute,private cartservice:Cartpageservice,private cd: ChangeDetectorRef,private router:Router) {}


ngOnInit() {
  console.log('Resolved cart items:');
  this.cartItems = this.route.snapshot.data['cart'];
  console.log('Resolved cart items:', this.cartItems);
}

  

  addToCart(product: any) {
    const existing = this.cartItems.find(i => i.ref === product.ref);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  placeOrder() {
    // alert('inside placeorder');
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      alert('invalid');
      return;
    }
    const user = JSON.parse(userString);
    const userId = user.id;
    this.cartservice.placeOrder(userId).subscribe({
        next: (res) => {
          alert('Order placed successfully!');
          // this.router.navigate(['/orders']);
        },
        error: (err) => {
          alert('Failed to place order: ' + err.error);
        }
    });
    this.cartItems = [];
  }
}


