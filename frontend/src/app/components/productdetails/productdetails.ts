import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Productdetailsservice } from '../../services/productdetailsservice/productdetailsservice';
import { Cartpageservice } from '../../services/cartservice/cartpageservice';

@Component({
  selector: 'app-productdetails',
  imports: [CommonModule, FormsModule],
   standalone: true,
  templateUrl: './productdetails.html',
 styleUrls: ['./productdetails.css']
})
export class Productdetails {
   product:any = null;
  loading = true;
  error = '';
  quantity = 1;
  
    constructor(private route: ActivatedRoute,private proddetailservice:Productdetailsservice,private cartservice:Cartpageservice,private cd: ChangeDetectorRef,private router:Router) {
       console.log('constructor: Productdetails');
    }


  ngOnInit(): void {
    console.log('inside product details');
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      console.log('product id',productId);
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }
  loadProduct(productId: number): void {
    this.loading = true;
    const resolvedData = this.route.snapshot.data['product'];
    console.log('resolved data'+resolvedData);
    if (resolvedData) {
      this.product = resolvedData;
    } else {
      this.error = 'Product not found';
    }

  }

  getImageUrl(imageUrl: string | undefined): string {
       return `${imageUrl}`;
  }
  increaseQuantity(item: any): void {
    this.quantity++;
    this.cartservice.updateCartQuantity(item.cartid,this.quantity).subscribe({
    next: () => {
      console.log(`Quantity updated for cart item ${item.cartId}`);
    },
    error: err => {
      console.error('Failed to update quantity', err);
      // Revert UI change if failed
      item.quantity--;
    }
    });
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addToCart(): void {
    // TODO: Implement add to cart functionality
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      alert('Please login to add items to cart.');
      return;
    }
    if (this.quantity <= 0) {
    alert('Quantity must be at least 1.');
    return;
  }
  

    const user = JSON.parse(userString);
    const userId = user.id;
    console.log(`Adding ${this.quantity} of ${this.product?.productName} to cart`);
    // alert(`Added ${this.quantity} ${this.product?.productName} to cart!`);
    const payload = {
       userId: userId,
      productId: this.product.productId,
     
      quantity: this.quantity
    };
    console.log('Sending to cart:', payload);

    this.cartservice.addtoCartService(payload).subscribe({
      next: (res) => {
          console.log('Added to cart:', res);
          alert(`Added  ${this.product.productName} to cart!`);
        },
      error: (err) => {
          console.error('Error adding to cart', err);
          alert('Failed to add to cart.');
      }
    });

  }

  buyNow(): void {
    // TODO: Implement buy now functionality
    console.log(`Buying ${this.quantity} of ${this.product?.productName}`);
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      alert('Please login to add items to cart.');
      return;
    }
    const user = JSON.parse(userString);
    const userId = user.id;
    this.cartservice.placeOrder(userId).subscribe({
      next: (res) => {
          console.log('placed order:', res);
          alert("placed order");
      
        },
      error: (err) => {
          console.error('Error placing cart', err);
     
      }

    })
    alert(`Proceeding to checkout for ${this.quantity} ${this.product?.productName}!`);
  }










}
