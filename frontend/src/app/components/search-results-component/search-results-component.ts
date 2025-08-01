import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';
import { Productdetailsservice } from '../../services/productdetailsservice/productdetailsservice';

@Component({
  selector: 'app-search-results-component',
  imports: [],
  templateUrl: './search-results-component.html',
  styleUrl: './search-results-component.css'
})
export class SearchResultsComponent {
  searchTerm = '';
  searchResults: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: Productdetailsservice
  ) {}
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
    const searchTerm = params['searchTerm'];
    console.log(searchTerm);
    if (searchTerm) {
      this.productService.searchProductsByName(searchTerm).subscribe({
        next: (products) => this.searchResults = products,
        error: (err) => {
          console.error(err);
          this.searchResults = [];
        }
      });
    }
  });

  }
  searchByName(name: string): void {
    this.productService.searchProductsByName(name).subscribe({
      next: (products) => {this.searchResults = products;
        console.log('products'+products);
      },
      error: (err) => {
        console.error('Search error:', err);
        this.searchResults = [];
      }
    });
  }

}
