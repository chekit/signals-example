import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from 'src/app/core/models/products-response.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  imports: [CommonModule, ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent {
  @Input() products: Product[] = [];

  trackByFn(_: number, { id }: Product): number {
    return id;
  }
}
