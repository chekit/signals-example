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

  getProducts(
    { limit, skip }: GetProductsConfig,
    categoryName: string = ''
  ): Observable<ProductsResponse> {
    const url = categoryName
      ? `/products/category/${categoryName}?limit=${limit}&skip=${skip}`
      : `/products?limit=${limit}&skip=${skip}`;

    return this.http.get<ProductsResponse>(url);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`/products/categories`);
  }
}