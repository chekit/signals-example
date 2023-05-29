import { ActivatedRoute } from '@angular/router';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let spectator: Spectator<ProductCardComponent>;
  let component: ProductCardComponent;

  const createComponent = createComponentFactory({
    component: ProductCardComponent,
    mocks: [ActivatedRoute],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
