import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
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
  categories$: Observable<string[]> = this.productsService.getCategories();

  constructor(private productsService: ProductsService) {}
}
