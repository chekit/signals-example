import { CommonModule } from '@angular/common';
import { Component, OnInit, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { GetProductsConfig } from 'src/app/core/models/get-products-config';
import {
  Product,
  ProductsResponse,
} from 'src/app/core/models/products-response.model';
import { ProductsService } from './../../core/services/products.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductCardComponent,
    ProductsListComponent,
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

  productsData$: Observable<ProductsResponse> = this.requestParamsSubject.pipe(
    concatMap((params: any) => this.productsService.getProducts(params)),
    tap((data: any) => {
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

  constructor(private productsService: ProductsService) {
    effect((clean) => {
      clean(() => console.log('clean home'));
    });
  }

  ngOnInit(): void {}

  onLoadMoreProducts(): void {
    const { limit, skip } = this.requestParamsSubject.getValue();
    this.requestParamsSubject.next({ limit, skip: skip + 10 });
  }

  private concatProducts(prev: Product[] = [], next: Product[]): Product[] {
    return prev.concat(next);
  }
}
