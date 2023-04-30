import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFilterComponent } from './product-filter.component';

describe('ProductFilterComponent', () => {
  let component: ProductsFilterComponent;
  let fixture: ComponentFixture<ProductsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsFilterComponent],
    });
    fixture = TestBed.createComponent(ProductsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
