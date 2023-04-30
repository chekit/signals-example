import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductPageComponent],
    });
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
