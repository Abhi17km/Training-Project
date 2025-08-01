import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { Productservice } from '../../services/productservice/productservice';
import { Productdetailsservice } from '../../services/productdetailsservice/productdetailsservice';

@Component({
  selector: 'app-category-page',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css'
})
export class CategoryPage {

products: any;


// onProductClick(_t44: Product) {
// throw new Error('Method not implemented.');
// }
getImageUrl(imagePath: string) {
 return `${imagePath}`;
}
clearSearch() {
throw new Error('Method not implemented.');
}
searchProducts() {
throw new Error('Method not implemented.');
}

  categoryId: Number | undefined;

  loading = false;
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  error = '';
  searchTerm: string = '';
 

  constructor(private route: ActivatedRoute,private prodservice:Productservice,private cd: ChangeDetectorRef,private router:Router,private proddetailservice:Productdetailsservice) {}
  viewProduct(p: any) {
        console.log('view product clicked'+p.productId+" "+this.route+"product");
       
        this.router.navigate(['home-layout/product', p.productId]);
        
    }
  ngOnInit(): void {
    console.log('inside category page');
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('categoryid') )
      console.log('Category inside category page:', this.categoryId);
      // Fetch products based on this.categoryName from backend here
      this.fetchProductsByCategory(this.categoryId);
      // if(this.categoryId!=0){
      //   this.fetchProductsByCategory(this.categoryId);
      // }
    });


     this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      if (this.searchTerm) {
        this.searchByName(this.searchTerm);
      }
    });
  }
  searchByName(name: string) {
    this.proddetailservice.searchProductsByName(name).subscribe({
      next: (products) => {
         console.log('Search products', products);
        this.filteredProducts = products;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.filteredProducts = []; // optional: clear results on error
      }
    });
  }

  fetchProductsByCategory(categoryId:Number) {
    console.log("fetching......",this.products);
    this.prodservice.getProductsByCategory(categoryId).subscribe({
      next: (data) => {
      
      this.products=data;
      this.cd.detectChanges(); 
      console.log('data',this.products);

      this.loading = false;
    },
    error: (err) => {
      this.error = 'Failed to load products';
      this.loading = false;
      console.error(err);
    }
    });
    
  }

}
