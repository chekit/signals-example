import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import {
  ComponentWithLoaderBase,
  LoaderComponent,
  NotificationComponent,
} from '../../core/components';
import { Product } from '../../core/models/products-response.model';
import {
  AddProductPayload,
  ProductsService,
} from '../../core/services/products.service';

@Component({
  selector: 'page-add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificationComponent,
    LoaderComponent,
  ],
})
export class AddProductPageComponent
  extends ComponentWithLoaderBase
  implements OnInit
{
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private fb = inject(FormBuilder);

  title = toSignal(this.route.title);
  categories = this.productsService.getCategories();
  isAdded = computed(() => {
    const result = this.addProductResult();

    return !!result;
  });
  addProductResult = signal<Partial<Product> | null>(null);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    price: [0, Validators.required],
    category: ['', Validators.required],
  });

  ngOnInit(): void {
    this.isLoading.set(false);
  }

  submitProduct() {
    this.isLoading.set(true);

    this.productsService
      .addProduct(this.productForm.value as AddProductPayload)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((response) => this.addProductResult.set(response));
  }

  onAddNewProduct() {
    this.addProductResult.set(null);

    this.productForm.reset();
  }
}
