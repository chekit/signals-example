import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomePageComponent),
    title: 'Products catalogue',
  },
  {
    path: 'add-product',
    loadComponent: () =>
      import('./features/add-product/add-product.component').then(
        (c) => c.AddProductPageComponent
      ),
    title: 'Add product',
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product/product.component').then(
        (c) => c.ProductPageComponent
      ),
  },
  {
    path: 'category/:name/product/:id',
    loadComponent: () =>
      import('./features/product/product.component').then(
        (c) => c.ProductPageComponent
      ),
  },
  {
    path: 'category/:name',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomePageComponent),
    title: 'Product catergory',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
