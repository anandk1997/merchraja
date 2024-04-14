import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CategoryPageComponent } from './components/category/category.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { InfluencerPageComponent } from './components/influencer-page/influencer-page.component';
import { MyOrderPageComponent } from './components/my-order-page/my-order-page.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'homePage',
  },
  {
    path: 'homePage',
    loadComponent: () =>
      import('./components/home-page/home-page.component').then(
        (mod) => mod.HomePageComponent,
      ),
    title: 'HomePage',
  },
  {
    path: 'homePage',
    data: { breadcrumb: 'Home' },
    title: 'HomePage',
    children: [
      {
        path: 'category',
        pathMatch: 'prefix',
        title: 'Category',
        loadComponent: () =>
          import('./components/category/category.component').then(
            (mod) => mod.CategoryPageComponent,
          ),
      },
      {
        path: 'category',
        data: { breadcrumb: 'Category' },
        children: [
          {
            path: 'product',
            pathMatch: 'prefix',
            title: 'Product',
            data: { breadcrumb: 'Product' },
            loadComponent: () =>
              import('./components/product-page/product-page.component').then(
                (mod) => mod.ProductPageComponent,
              ),
          },
        ],
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart-page/cart-page.component').then(
            (mod) => mod.CartPageComponent,
          ),
        pathMatch: 'prefix',
        title: 'Cart',
        data: { breadcrumb: 'Cart' },
      },
      {
        path: 'myOrder',
        loadComponent: () =>
          import('./components/my-order-page/my-order-page.component').then(
            (mod) => mod.MyOrderPageComponent,
          ),
        pathMatch: 'prefix',
        title: 'myOrder',
        data: { breadcrumb: 'myOrder' },
      },
      {
        path: 'order-confirmation',
        loadComponent: () =>
          import(
            './components/order-confirmation/order-confirmation.component'
          ).then((mod) => mod.OrderConfirmationComponent),
        pathMatch: 'prefix',
        title: 'order-confirmation',
        data: { breadcrumb: 'order-confirmation' },
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (mod) => mod.LoginComponent,
      ),
    title: 'LoginPage',
  },
  // {
  //   path: 'influencer',
  //   data: { breadcrumb: 'influencer' },
  //   title: 'Influencer',
  //   loadComponent: () => import('./components/influencer-page/influencer-page.component').then(mod => mod.InfluencerPageComponent),
  // }
];
