import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../services/product';


@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrls: ['./admin-products.css']
})
export class AdminProducts implements OnInit {
deleteOrder(arg0: any) {
throw new Error('Method not implemented.');
}
  products: Product[] = [];
  editMode = false;

  selectedProduct: Product = {
    productId: 0,
    productName: '',
    productDesc: '',
    productPrice: 0,
    imageUrl: '',
    categoryId: 0,
   
  };
orders: any;
loading: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.fetchProducts();
    this.products = this.route.snapshot.data['manageProducts'] ?? [];
  }

  fetchProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }

  // Open modal
  openEditModal(product: Product): void {
    this.selectedProduct = { ...product }; // clone
    this.editMode = true;
  }

  // Close modal
  closeEditModal(): void {
    this.editMode = false;
  }

  // Save product changes
  saveProductChanges(): void {
    if (!this.selectedProduct || !this.selectedProduct.productId) return;

    this.productService.updateProduct(this.selectedProduct.productId, this.selectedProduct).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.fetchProducts(); // Refresh
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Error updating product:', err);
        alert('Failed to update product.');
      }
    });
  }

  // Delete product
  deleteProduct(productId: number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        alert('Product deleted successfully!');
        location.reload();
        this.fetchProducts();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        alert('Failed to delete product.');
      }
    });
  }
}
