import { ActivatedRoute } from '@angular/router';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ProductsListComponent } from './products-list.component';
import { ProductsListSpecPage } from './products-list.component.spec-page';

const PRODUCTS = [
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
];

describe('ProductsListComponent', () => {
  let spectator: Spectator<ProductsListComponent>;
  let component: ProductsListComponent;
  let page: ProductsListSpecPage;

  const createComponent = createComponentFactory({
    component: ProductsListComponent,
    mocks: [ActivatedRoute],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    page = new ProductsListSpecPage(spectator);
  });

  it('should show products list', () => {
    spectator.setInput('products', PRODUCTS);
    spectator.detectChanges();

    expect(page.productsCards.length).toBe(PRODUCTS.length);
    expect(page.emptyMessage).toBeFalsy();
  });

  it('should show empty message', () => {
    spectator.setInput('products', []);
    spectator.detectChanges();

    expect(page.productsCards.length).toBe(0);
    expect(page.emptyMessage).toBeTruthy();
  });
});
