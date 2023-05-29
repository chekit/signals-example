import { SpectatorElement } from '@ngneat/spectator';
import { Spectator } from '@ngneat/spectator/jest';
import { HomePageComponent } from './home.component';

export class HomeComponentSpecPage {
  constructor(private spectator: Spectator<HomePageComponent>) {}

  get loadedInfo() {
    return this.spectator.query('[data-test="loaded-info"]');
  }

  get loadMoreButton() {
    return this.spectator.query(
      '[data-test="load-more-button"]'
    ) as SpectatorElement;
  }

  get productsFilter() {
    return this.spectator.query(
      '[data-test="products-filter"]'
    ) as SpectatorElement;
  }

  get productsCards() {
    return this.spectator.queryAll('[data-test="products-card"]');
  }

  get emptyMessage() {
    return this.spectator.query('[data-test="no-products-message"]');
  }

  get loader() {
    return this.spectator.query('[data-test="loader"]');
  }
}
