import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, finalize } from 'rxjs';
import {
  ComponentWithLoaderBase,
  NotificationComponent,
} from 'src/app/core/components';
import { Product } from 'src/app/core/models/products-response.model';
import {
  AddProductPayload,
  ProductsService,
} from 'src/app/core/services/products.service';

@Component({
  selector: 'page-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductPageComponent extends ComponentWithLoaderBase {
  title = 'Add Product';
  categories$ = this.productsService.getCategories();
  isAdded = false;

  private confirmationDataSubject: Subject<Partial<Product> | null> =
    new Subject();
  confirmationData$: Observable<Partial<Product> | null> =
    this.confirmationDataSubject.asObservable();

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

    this.isLoadingSubject.next(false);
  }

  submitProduct() {
    this.isLoadingSubject.next(true);

    this.productsService
      .addProduct(this.productForm.value as AddProductPayload)
      .pipe(finalize(() => this.isLoadingSubject.next(false)))
      .subscribe((data) => {
        this.confirmationDataSubject.next(data);
        this.isAdded = true;
      });
  }

  onAddNewProduct() {
    this.isAdded = false;
    this.confirmationDataSubject.next(null);
    this.productForm.reset();
  }
}
