import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/models/products-response.model';

@Pipe({
  name: 'productFilter',
  standalone: true,
})
export class ProductFilterPipe implements PipeTransform {
  transform(value: Product[], term: any): Product[] {
    term ??= '';
    if (!term) return value;

    return value.filter(({ title }) =>
      title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
  }
}
