import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from './core/services/products.service';
import { CategoriesListComponent } from "./core/components/categories-list/categories-list.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, CategoriesListComponent]
})
export class AppComponent implements OnInit {
  title = signal<string>('');
  update = 'init';

  categories$: Observable<string[]> = this.productsService.getCategories();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.title.set('Hello');

    setTimeout(() => {
      this.title.update((prev) => prev + 'World');
    }, 3000);
  }
}
