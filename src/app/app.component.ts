import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CategoriesListComponent } from './core/components';
import { ProductsService } from './core/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CategoriesListComponent,
  ],
})
export class AppComponent {
  private productsService = inject(ProductsService);

  categories: Signal<string[]> = this.productsService.getCategories();
}
