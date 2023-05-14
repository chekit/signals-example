import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
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

  protected productForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    price: [null, Validators.required],
    category: [null, Validators.required],
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
