import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetProductsConfig } from '../models/get-products-config';
import { Product, ProductsResponse } from '../models/products-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts({
    limit,
    skip,
  }: GetProductsConfig): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `/products?limit=${limit}&skip=${skip}`
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }
}
