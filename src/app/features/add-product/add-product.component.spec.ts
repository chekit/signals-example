import { signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '@ngneat/spectator';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { ProductsService } from './../../core/services/products.service';
import { AddProductPageComponent } from './add-product.component';
import { AddProductSpecPage } from './add-product.component.page-spec';

describe('AddProductPageComponent', () => {
  let spectator: Spectator<AddProductPageComponent>;
  let component: AddProductPageComponent;
  let page: AddProductSpecPage;

  const activatedRouteStub = new ActivatedRouteStub();
  const productServiceStub = {
    getCategories: () => signal([]),
    addProduct: jest.fn().mockReturnValue(of({})),
  };

  const createComponent = createComponentFactory({
    component: AddProductPageComponent,
    providers: [
      FormBuilder,
      {
        provide: ActivatedRoute,
        useValue: activatedRouteStub,
      },
      {
        provide: ProductsService,
        useValue: productServiceStub,
      },
    ],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    page = new AddProductSpecPage(spectator);
  });

  it('should show submit button as disabled/enabled', () => {
    spectator.detectChanges();

    expect(page.submit.disabled).toBeTruthy();

    component.productForm.get('title')?.setValue('Title');
    component.productForm.get('price')?.setValue(10);
    component.productForm.get('category')?.setValue('category');

    spectator.detectChanges();

    expect(page.submit.disabled).toBeFalsy();
  });

  it('should show confirmation and notification', () => {
    spectator.detectChanges();

    expect(page.confirmation).toBeFalsy();
    expect(page.notification).toBeFalsy();

    component.productForm.get('title')?.setValue('Title');
    component.productForm.get('price')?.setValue(10);
    component.productForm.get('category')?.setValue('category');

    spectator.detectChanges();

    spectator.click(page.submit);

    expect(page.confirmation).toBeTruthy();
    expect(page.notification).toBeTruthy();
  });
});
