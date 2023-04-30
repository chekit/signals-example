import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from 'src/app/core/models/products-response.model';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'page-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
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
