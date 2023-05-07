import { CommonModule } from '@angular/common';
import { Component, OnInit, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, finalize } from 'rxjs';
import { NotificationComponent } from 'src/app/core/components/notification/notification.component';
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
export class AddProductPageComponent implements OnInit {
  title = 'Add Product';
  categories$ = this.productsServvice.getCategories();
  isLoading = false;
  isAdded = false;
  private confirmationDataSubject: Subject<Partial<Product>> = new Subject();
  confirmationData$: Observable<Partial<Product>> =
    this.confirmationDataSubject.asObservable();

  protected productForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    price: [null, Validators.required],
    category: [null, Validators.required],
  });

  constructor(
    private productsServvice: ProductsService,
    private fb: FormBuilder
  ) {
    effect((clean) => {
      clean(() => console.log('clean edit'));
    });
  }

  ngOnInit(): void {}

  submitProduct() {
    this.isLoading = true;

    this.productsServvice
      .addProduct(this.productForm.value as AddProductPayload)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => {
        this.confirmationDataSubject.next(data);
        this.isAdded = true;
      });
  }
}
