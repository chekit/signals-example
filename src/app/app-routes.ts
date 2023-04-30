import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomePageComponent),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product/product.component').then(
        (c) => c.ProductPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
