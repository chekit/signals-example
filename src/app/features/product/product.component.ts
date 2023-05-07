import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CarouselComponent } from 'src/app/core/components/carousel/carousel.component';
import { Product } from 'src/app/core/models/products-response.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { ImageDataTransformerPipe } from './pipes/image-data-transformer.pipe';

@Component({
  selector: 'page-product',
  standalone: true,
  templateUrl: './product.component.html',
  imports: [CommonModule, CarouselComponent, ImageDataTransformerPipe],
})
export class ProductPageComponent {
  product$: Observable<Product> = this.route.params.pipe(
    switchMap(({ id }: Params) => this.productsService.getProduct(id))
  );

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}
}
