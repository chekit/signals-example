import { Spectator } from '@ngneat/spectator/jest';
import { AddProductPageComponent } from './add-product.component';

export class AddProductSpecPage {
  constructor(private spectator: Spectator<AddProductPageComponent>) {}

  get submit() {
    return this.spectator.query(
      '[data-test="submit-product-button"]'
    ) as HTMLButtonElement;
  }

  get addproductForm() {
    return this.spectator.query('[data-test="add-product-form"]');
  }

  get confirmation() {
    return this.spectator.query('[data-test="confirmation"]');
  }

  get notification() {
    return this.spectator.query('[data-test="notification"]');
  }
}
