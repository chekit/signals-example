import { CommonModule } from '@angular/common';
import { Component, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { GetProductsConfig } from 'src/app/core/models/get-products-config';
import {
  Product,
  ProductsResponse,
} from 'src/app/core/models/products-response.model';
import { ProductsService } from './../../core/services/products.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsFilterComponent } from './components/product-filter/product-filter.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductFilterPipe } from './pipes/product-filter.pipe';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductCardComponent,
    ProductsFilterComponent,
    ProductsListComponent,
    ProductFilterPipe,
  ],
})
export class HomePageComponent implements OnInit {
  title = 'HOME';
  canLoadMore = true;

  private requestParamsSubject: BehaviorSubject<GetProductsConfig> =
    new BehaviorSubject({
      limit: 10,
      skip: 0,
    });
  private dataSubject: BehaviorSubject<ProductsResponse> = new BehaviorSubject(
    {} as ProductsResponse
  );

  productsData$: Observable<ProductsResponse> = combineLatest([
    this.requestParamsSubject,
    this.route.params,
  ]).pipe(
    concatMap(([params, { name }]: [GetProductsConfig, Params]) =>
      this.productsService.getProducts(params, name)
    ),
    tap((data: ProductsResponse) => {
      const { products: prev } = this.dataSubject.getValue();
      const { limit, skip, total, products: next } = data;

      this.dataSubject.next({
        products: this.concatProducts(prev, next),
        limit,
        skip,
        total,
      });
    }),
    map(() => this.dataSubject.getValue()),
    tap((data) => {
      this.canLoadMore = data.products.length < data.total;
    })
  );

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    effect((clean) => {
      clean(() => console.log('clean home'));
    });
  }

  ngOnInit(): void {}

  onLoadMoreProducts(): void {
    const { limit, skip } = this.requestParamsSubject.getValue();
    this.requestParamsSubject.next({ limit, skip: skip + 10 });
  }

  onTermChange(value: string) {
    console.log(value);
  }

  private concatProducts(prev: Product[] = [], next: Product[]): Product[] {
    const nextCategories = new Set(next.map(({ category }) => category));
    const prevCategories = new Set(prev.map(({ category }) => category));

    if (nextCategories.size === 1 && prevCategories.size > 1) {
      return next;
    }

    if (
      nextCategories.size === 1 &&
      prevCategories.size === 1 &&
      !nextCategories.has(Array.from(prevCategories.values())[0])
    ) {
      return next;
    }

    return prev.concat(next);
  }

  private resetProductsData(): void {
    this.dataSubject.next({
      products: [],
      limit: 10,
      skip: 0,
      total: 0,
    });
  }
}
