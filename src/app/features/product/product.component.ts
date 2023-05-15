import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/core/models/products-response.model';
import { ProductsService } from 'src/app/core/services/products.service';
import {
  ComponentWithLoaderBase,
  LoaderComponent,
} from '../../core/components';
import { CarouselComponent } from './components/carousel/carousel.component';
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
  private productData$: Observable<Product> = this.route.params.pipe(
    tap(() => this.isLoading.set(true)),
    switchMap(({ id }: Params) => this.productsService.getProduct(id)),
    tap(() => this.isLoading.set(false))
  );

  product = toSignal(this.productData$);

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private title: Title
  ) {
    super();

    effect(() => {
      const data = this.product();

      this.title.setTitle(data?.title || '');
    });
  }
}
