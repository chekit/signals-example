import { Spectator } from '@ngneat/spectator/jest';
import { ProductsListComponent } from './products-list.component';

export class ProductsListSpecPage {
  constructor(private spectator: Spectator<ProductsListComponent>) {}

  get productsCards() {
    return this.spectator.queryAll('[data-test="products-card"]');
  }

  get emptyMessage() {
    return this.spectator.query('[data-test="no-products-message"]');
  }
}
