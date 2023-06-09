import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { combineLatest, concatMap, tap } from 'rxjs';
import { GetProductsConfig } from 'src/app/core/models/get-products-config';
import { Product } from 'src/app/core/models/products-response.model';
import {
  ComponentWithLoaderBase,
  LoaderComponent,
} from '../../core/components';
import { ProductsService } from './../../core/services/products.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsFilterComponent } from './components/product-filter/product-filter.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductCardComponent,
    ProductsFilterComponent,
    ProductsListComponent,
    LoaderComponent,
  ],
})
export class HomePageComponent extends ComponentWithLoaderBase {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  canLoadMore = computed<boolean>(() => {
    const total = this.productsTotal();
    const products = this.products();

    return products.length < total;
  });

  products = signal<Product[]>([]);

  productsTotal = computed<number>(
    () => {
      const { total } = this.productsData();
      return total;
    },
    // Won't trigger any updates if the values are equal
    { equal: (a, b) => a === b }
  );

  searchTerm = signal('');

  private requestParams = signal<GetProductsConfig>({ limit: 10, skip: 0 });

  private search$ = combineLatest([
    toObservable(this.requestParams),
    this.route.params,
  ]).pipe(
    tap(() => this.isLoading.set(true)),
    concatMap(([params, { name }]: [GetProductsConfig, Params]) =>
      this.productsService.getProducts(params, name)
    ),
    tap(() => this.isLoading.set(false))
  );

  private productsData = toSignal(this.search$, {
    initialValue: {
      total: 0,
      skip: 0,
      products: [],
      limit: 0,
    },
  });

  constructor() {
    super();

    effect(
      () => {
        const { products: next } = this.productsData();
        const term = this.searchTerm();

        this.products.update((prev) => {
          const products = this.concatProducts(prev, next);
          return this.filterProducts(products, term);
        });
      },
      { allowSignalWrites: true }
    );
  }

  onLoadMoreProducts(): void {
    this.requestParams.update(({ skip, limit }) => ({
      limit,
      skip: skip + 10,
    }));
  }

  private concatProducts(prev: Product[] = [], next: Product[]): Product[] {
    const nextCategories = new Set(next.map(({ category }) => category));
    const prevCategories = new Set(prev.map(({ category }) => category));

    const isSingleCategory =
      nextCategories.size === 1 && prevCategories.size > 1;
    const isNewSingleCategory =
      nextCategories.size === 1 &&
      prevCategories.size === 1 &&
      !nextCategories.has(Array.from(prevCategories.values())[0]);

    if (isSingleCategory || isNewSingleCategory) {
      return next;
    }

    return prev.concat(next);
  }

  private filterProducts(value: Product[], term: string = ''): Product[] {
    if (!term) return value;

    return value.filter(({ title }) =>
      title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
  }
}
