import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../models/Category';
import { CategoryService } from '../../../services/mcategory';



@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-category.html',
  styleUrl: './admin-category.css'
})

export class AdminCategory implements OnInit {
  categories : Category[] = [];
  category : Category = {
    categoryId:0,
    categoryName : ''
    };
  newCategoryName: string = '';
  loading = false;

  constructor(private categoryService: CategoryService,private route: ActivatedRoute,) {}

  

  ngOnInit() {
    this.fetchCategories();
    this.categories = this.route.snapshot.data['manageCategories'] ?? [];
    //  this.route.data.subscribe(data => {
    // this.categories = data['manageCategories'];
    // console.log('Resolved categories:', this.categories);
  // });
  }

  fetchCategories() {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.loading = false;
      }
    });
  }

  addCategory() {
    if (!this.newCategoryName.trim()) return;

    const newCat = { categoryName: this.newCategoryName.trim() };

    this.categoryService.addCategory(newCat).subscribe({
      next: () => {
        this.newCategoryName = '';
        this.fetchCategories(); // Refresh the list
      },
      error: (err) => console.error('Failed to add category', err)
    });
  }

// deleteCategory(id: number): void {

//   if (!confirm('Are you sure you want to delete this category?')) return;

//   this.categoryService.deleteCategory(id).subscribe({
//     next: () => {
//       alert('Category deleted successfully!');
//       this.fetchCategories(); // reloads list after deletion
//     },
//     error: (err) => {
//       console.error('Error deleting category:', err);
//       alert('Failed to delete category.');
//     }
//   });

// }
deleteCategory(id: number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
  console.log(this.category.categoryId);
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        alert('Category deleted successfully!');
        location.reload();
        //  this.categories = this.route.snapshot.data['manageCategories'] ?? [];
        this.fetchCategories();
      },
      error: (err) => {
        console.error('Error deleting category:', err);
        alert('Failed to delete category.');
      }
    });
  }
}



