import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/core/models/products-response.model';
import { ProductsService } from 'src/app/core/services/products.service';
import {
  CarouselComponent,
  ComponentWithLoaderBase,
  LoaderComponent,
} from '../../core/components';
import { ImageDataTransformerPipe } from './pipes/image-data-transformer.pipe';

@Component({
  selector: 'page-product',
  standalone: true,
  templateUrl: './product.component.html',
  imports: [
    CommonModule,
    CarouselComponent,
    ImageDataTransformerPipe,
    LoaderComponent,
  ],
})
export class ProductPageComponent extends ComponentWithLoaderBase {
  product$: Observable<Product> = this.route.params.pipe(
    tap(() => this.isLoading.set(true)),
    switchMap(({ id }: Params) => this.productsService.getProduct(id)),
    tap((product) => {
      this.title.setTitle(product.title);
      this.isLoading.set(false);
    })
  );

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private title: Title
  ) {
    super();
  }
}
