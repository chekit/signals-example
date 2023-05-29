import { fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '@ngneat/spectator';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { delay, of } from 'rxjs';
import { Product } from './../../core/models/products-response.model';
import { ProductsService } from './../../core/services/products.service';
import { ProductPageComponent } from './product.component';

const PRODUCT: Product = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: '',
  images: ['', '', ''],
};

describe('ProductComponent', () => {
  let spectator: Spectator<ProductPageComponent>;
  let component: ProductPageComponent;

  const activatedRouteStub = new ActivatedRouteStub();
  const productsServiceStub = {
    getProductById: jest.fn().mockReturnValue(of(PRODUCT).pipe(delay(400))),
  };

  const createComponent = createComponentFactory({
    component: ProductPageComponent,
    providers: [
      {
        provide: ActivatedRoute,
        useValue: activatedRouteStub,
      },
      {
        provide: ProductsService,
        useValue: productsServiceStub,
      },
    ],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should toggle loader', fakeAsync(() => {
    spectator.detectChanges();

    let loader = spectator.query('[data-test="loader"]');

    expect(loader).toBeTruthy();

    // Creted and issue/request: https://github.com/angular/angular/issues/50503
    // spectator.tick(400);

    // loader = spectator.query('[data-test="loader"]');

    // expect(loader).toBeFalsy();
  }));
});
