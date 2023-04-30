import { HttpClient } from '@angular/common/http';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { ProductsService } from './products.service';

describe('Products Service', () => {
  let spectator: SpectatorService<ProductsService>;
  let service: ProductsService;

  const createService = createServiceFactory({
    service: ProductsService,
    mocks: [HttpClient],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should add request parameters', () => {
    const http = spectator.inject(HttpClient);
    const getSpy = jest.spyOn(http, 'get').mockReturnValueOnce(of({}));

    service.getProducts({ limit: 20, skip: 10 });

    expect(getSpy).toHaveBeenCalledWith(`/products?limit=20&skip=10`);
  });
});
