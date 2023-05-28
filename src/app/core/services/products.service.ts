import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { GetProductsConfig } from '../models/get-products-config';
import { Product, ProductsResponse } from '../models/products-response.model';

export type AddProductPayload = Partial<Omit<Product, 'id'>>;

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

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`);
  }

  getCategories(): Signal<string[]> {
    return toSignal(this.http.get<string[]>(`/products/categories`), {
      initialValue: [],
    });
  }

  addProduct(payload: AddProductPayload): Observable<Product> {
    return this.http.post<Product>(`/products/add`, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
