import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';
import { ProductsService } from './core/services/products.service';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [
      {
        provide: ProductsService,
        useValue: {
          getCategories: () => signal([]),
        },
      },
    ],
    mocks: [ActivatedRoute],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create the app', () => {
    spectator.detectChanges();

    expect(component).toBeTruthy();
  });
});
