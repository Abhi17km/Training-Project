import { Routes } from '@angular/router';
import { Logincomp } from './components/logincomp/logincomp';
import { Signupcomp } from './components/signupcomp/signupcomp';
import { Homecomp } from './components/welcomecomp/homecomp';
import { Homepagecomp } from './components/homepagecomp/homepagecomp';

import { Admincomp } from './components/admincomp/admincomp';
import { Forgotpwd } from './components/forgotpwd/forgotpwd';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { authGuard } from './guards/auth-guard';
import { HomeLayout } from './layouts/home-layout/home-layout';
import { Profilecomp } from './components/profilecomp/profilecomp';
import { Orderscomp } from './components/orderscomp/orderscomp';
import { Cartcomp } from './components/cartcomp/cartcomp';
import { CategoryResolver } from './resolvers/category.resolver';
import { CategoryPage } from './components/category-page/category-page';
import { Productdetails } from './components/productdetails/productdetails';
import { CategorypageResolver } from './resolvers/categorypage.resolver';
import { CartpageResolver } from './resolvers/cartpage.resolver';
import { OrderpageResolver } from './resolvers/orderpage.resolver';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders';
import { AdminProducts } from './components/admin-products/admin-products';
import { AdminCategory } from './components/admincomp/admin-category/admin-category';
import { ManageCategories } from './resolvers/manage-categories';
import { ManageProducts } from './resolvers/manage-products';
import { ViewOrders } from './resolvers/view-orders';
import { SearchResultsComponent } from './components/search-results-component/search-results-component';

export const routes: Routes = [
  {
    path: '',
    component: Homecomp
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Logincomp },
      { path: 'signup', component: Signupcomp },
      { path: 'changepassword', component: Forgotpwd }
    ]
  },
  {
  path: 'home-layout',
  component: HomeLayout,
  canActivate: [authGuard],
   
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Homepagecomp,resolve: {
      categories: CategoryResolver}, 
    }, // 👈 here
    { path: 'profile', component: Profilecomp },
    {path:'orders',component:Orderscomp,resolve: {
      orderItems: OrderpageResolver
    }},
    { path: 'search', component: SearchResultsComponent },
    {path:'cart',component:Cartcomp,resolve: {
    cart: CartpageResolver
  }},
    { path: 'category/:categoryid', component: CategoryPage},
    {path:'product/:id',component:Productdetails,resolve: {
    product: CategorypageResolver
  } }
  ]
},
{
  path: 'admin/orders',
  resolve: {orders : ViewOrders},
  component: AdminOrdersComponent,
  canActivate: [authGuard]
},
 {
  path: 'admin/products',
  resolve:{manageProducts : ManageProducts},
  component:AdminProducts,
  canActivate: [authGuard] // if you have guards
},
  {
    path: 'admin',
    component: Admincomp,
    canActivate: [authGuard]
  },
  { path: 'admin/categories',
    resolve:{ manageCategories : ManageCategories },
    component: AdminCategory 
  }
];
