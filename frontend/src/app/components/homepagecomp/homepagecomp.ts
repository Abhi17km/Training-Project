import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category, CategoryItems } from '../../services/category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepagecomp',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './homepagecomp.html',
  styleUrl: './homepagecomp.css'
})
export class Homepagecomp implements OnInit, OnDestroy {
  current = 0;
  intervalId: any;
  categories: any;
  constructor(private cdr: ChangeDetectorRef,private categoryService: Category,private router: Router,private route:ActivatedRoute) {}
   
  // categories = [
  // { name: 'Electronics', image: 'assets/electronics.jpg' },
  // { name: 'Clothing', image: 'assets/clothes.jpg' },
  // { name: 'Books', image: 'assets/categories/books.jpg' },
  // { name: 'Beauty', image: 'assets/categories/beauty.jpg' }
  // ];
  banners = [
    {
      image: 'assets/banner1.jpeg',
      alt: 'banner1',
      link: 'https://www.flipkart.com/'
    },
    // {
    //   image: 'assets/banner2.jpg',
    //   alt: 'banner2',
    //   link: '#'
    // },
    // {
    //   image: 'assets/banner3.jpg',
    //   alt: 'banner3',
    //   link: '#'
    // },
    {
      image: 'assets/banner4.jpeg',
      alt: 'samsung sale',
      link: '#'
    },
    {
      image: 'assets/banner5.jpeg',
      alt: 'samsung sale',
      link: '#'

    },
    {
      image: 'assets/banner6.jpeg',
      alt: 'samsung sale',
      link: '#'
    },
    {
      image: 'assets/banner7.jpeg',
      alt: 'samsung sale',
      link: '#'
    }

  ];
  
   ngOnInit(): void {
    this.startAutoSlide();
    // this.loadCategories();
    this.categories = this.route.snapshot.data['categories'];
    console.log(this.categories);

  
  }


  ngOnDestroy(): void {
    this.stopAutoSlide();
    
  }
  loadCategories() {
    console.log('categories loaded........')
   this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Fetched categories:', this.categories);
      },
      error: (err) => {
        console.error('Failed to fetch categories:', err);
      }
    });
  }

  startAutoSlide(): void {
  this.intervalId = setInterval(() => {
    this.next();
    this.cdr.detectChanges(); // ✅ force UI to re-render
  }, 4000);
}

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  next(): void {
    this.current = (this.current + 1) % this.banners.length;
  }

  prev(): void {
    this.current = (this.current - 1 + this.banners.length) % this.banners.length;
  }

  goTo(index: number): void {
    this.current = index;
  }
 

  onCategoryClick(category: any) {
    console.log('Category clicked:', category.categoryId);
    const routeName = category.categoryName.toLowerCase();
    const routename=encodeURIComponent(category.categoryName);
     console.log('routename', routename);

    this.router.navigate(['/home-layout/category', category.categoryId], { relativeTo: this.route });
    // You can navigate to category page here if needed
}

}
