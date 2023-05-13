import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { GetProductsConfig } from 'src/app/core/models/get-products-config';
import {
  Product,
  ProductsResponse,
} from 'src/app/core/models/products-response.model';
import {
  ComponentWithLoaderBase,
  LoaderComponent,
} from '../../core/components';
import { ProductsService } from './../../core/services/products.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsFilterComponent } from './components/product-filter/product-filter.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductFilterPipe } from './pipes/product-filter.pipe';

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
    ProductFilterPipe,
    LoaderComponent,
  ],
})
export class HomePageComponent extends ComponentWithLoaderBase {
  productsData = signal<ProductsResponse>({
    total: 0,
    skip: 0,
    products: [],
    limit: 0,
  });

  canLoadMore = computed<boolean>(() => {
    const { total, products } = this.productsData();

    return products.length < total;
  });

  requestParams = signal<GetProductsConfig>({ limit: 10, skip: 0 });

  productsData$: Observable<ProductsResponse> = combineLatest([
    toObservable(this.requestParams),
    this.route.params,
  ]).pipe(
    tap(() => this.isLoadingSubject.next(true)),
    concatMap(([params, { name }]: [GetProductsConfig, Params]) =>
      this.productsService.getProducts(params, name)
    ),
    tap((data: ProductsResponse) => {
      const { products: prev } = this.productsData();
      const { limit, skip, total, products: next } = data;
      const nextProductsDataState: ProductsResponse = {
        products: this.concatProducts(prev, next),
        limit,
        skip,
        total,
      };

      this.productsData.set(nextProductsDataState);
    }),
    map(() => this.productsData()),
    tap(() => this.isLoadingSubject.next(false))
  );

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    super();
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
}
