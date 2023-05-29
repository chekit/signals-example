import { fakeAsync } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ProductsFilterComponent } from './product-filter.component';

describe('ProductFilterComponent', () => {
  let spectator: Spectator<ProductsFilterComponent>;
  let component: ProductsFilterComponent;

  const createComponent = createComponentFactory({
    component: ProductsFilterComponent,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should emit value', fakeAsync(() => {
    const TERM = 'test';
    spectator.detectChanges();

    const emitSpy = jest.spyOn(component.termChange, 'emit');

    component.filterInput.setValue(TERM);
    spectator.tick(300);

    expect(emitSpy).toHaveBeenCalledWith(TERM);
  }));
});
