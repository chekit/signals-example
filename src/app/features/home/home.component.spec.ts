import { fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '@ngneat/spectator';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { delay, of } from 'rxjs';
import { GetProductsConfig } from 'src/app/core/models/get-products-config';
import { ProductsResponse } from '../../core/models/products-response.model';
import { ProductsService } from './../../core/services/products.service';
import { ProductsFilterComponent } from './components/product-filter/product-filter.component';
import { HomePageComponent } from './home.component';
import { HomeComponentSpecPage } from './home.component.spec-page';

const PRODUCTS_RESPONSE: ProductsResponse = {
  products: [
    {
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
      images: [],
    },
  ],
  total: 100,
  skip: 0,
  limit: 30,
};

fdescribe('Home page', () => {
  let spectator: Spectator<HomePageComponent>;
  let component: HomePageComponent;
  let page: HomeComponentSpecPage;

  const activatedRouteStub = new ActivatedRouteStub();
  const productsServiceStub = {
    getProducts: jest
      .fn()
      .mockImplementation(({ limit, skip }: GetProductsConfig) =>
        of({ ...PRODUCTS_RESPONSE, limit, skip })
      ),
  };

  const createComponent = createComponentFactory({
    component: HomePageComponent,
    imports: [],
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
    page = new HomeComponentSpecPage(spectator);
  });

  it('should pupulate products signals with new products', () => {
    spectator.detectChanges();

    expect(component.products()).toEqual(PRODUCTS_RESPONSE.products);
  });

  it('should update products number and total', () => {
    spectator.detectChanges();

    expect(page.loadedInfo).toHaveText('1 out of 100');

    // Will merge one more product
    component.onLoadMoreProducts();
    // To make Signals to take an effect for the view we need to start the change detection
    spectator.detectChanges();

    expect(page.loadedInfo).toHaveText('2 out of 100');

    productsServiceStub.getProducts.mockReturnValueOnce(
      of({ ...PRODUCTS_RESPONSE, total: 120, skip: 10, limit: 10 })
    );

    // Will merge one more product
    component.onLoadMoreProducts();
    // To make Signals to take an effect for the view we need to start the change detection
    spectator.detectChanges();

    expect(page.loadedInfo).toHaveText('3 out of 120');
  });

  it('should hide load more button if everyhting loaded', () => {
    productsServiceStub.getProducts.mockReturnValueOnce(
      of({ ...PRODUCTS_RESPONSE, total: 2 })
    );
    spectator.detectChanges();

    expect(page.loadMoreButton).toBeTruthy();

    productsServiceStub.getProducts.mockReturnValueOnce(
      of({ ...PRODUCTS_RESPONSE, total: 2 })
    );
    spectator.click(page.loadMoreButton);

    expect(page.loadMoreButton).toBeFalsy();
  });

  it('should filter products by term', () => {
    spectator.detectChanges();

    expect(component.products().length).toBe(PRODUCTS_RESPONSE.products.length);
    expect(page.productsCards.length).toBe(PRODUCTS_RESPONSE.products.length);
    expect(page.emptyMessage).toBeFalsy();

    spectator.triggerEventHandler(
      ProductsFilterComponent,
      'termChange',
      'test'
    );
    // To make Signals to take an effect for the view we need to start the change detection
    spectator.detectChanges();

    expect(component.products().length).toBe(0);
    expect(component.products().length).toBe(0);
    expect(page.emptyMessage).toBeTruthy();
  });

  it('should update loaded info if we filter', () => {
    spectator.detectChanges();

    expect(page.loadedInfo).toHaveText('1 out of 100');

    const productsFilter = spectator.query(ProductsFilterComponent);
    productsFilter?.termChange.next('test');
    // To make Signals to take an effect for the view we need to start the change detection
    spectator.detectChanges();

    expect(page.loadedInfo).toHaveText('0 out of 100');
  });

  it('should toggle loader', fakeAsync(() => {
    productsServiceStub.getProducts.mockReturnValueOnce(
      of(PRODUCTS_RESPONSE).pipe(delay(400))
    );
    spectator.detectChanges();

    expect(page.loader).toBeTruthy();

    spectator.tick(200);

    expect(page.loader).toBeTruthy();

    spectator.tick(300);

    expect(page.loader).toBeFalsy();
  }));
});
