import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import {
  ComponentWithLoaderBase,
  NotificationComponent,
} from 'src/app/core/components';
import { Product } from 'src/app/core/models/products-response.model';
import {
  AddProductPayload,
  ProductsService,
} from 'src/app/core/services/products.service';
import { LoaderComponent } from '../../core/components/loader/loader.component';

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
export class AddProductPageComponent extends ComponentWithLoaderBase {
  private route = inject(ActivatedRoute);

  title = toSignal(this.route.title);
  categories = this.productsService.getCategories();
  isAdded = computed(() => {
    const result = this.addResult();

    return !!result;
  });
  addResult = signal<Partial<Product> | null>(null);

  protected productForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    price: [null, Validators.required],
    category: [null, Validators.required],
  });

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {
    super();

    this.isLoading.set(false);
  }

  submitProduct() {
    this.isLoading.set(true);

    this.productsService
      .addProduct(this.productForm.value as AddProductPayload)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((data) => {
        this.addResult.set(data);
      });
  }

  onAddNewProduct() {
    this.addResult.set(null);

    this.productForm.reset();
  }
}
