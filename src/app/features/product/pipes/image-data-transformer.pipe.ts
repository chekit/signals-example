import { Pipe, PipeTransform } from '@angular/core';
import { ImageData } from 'src/app/core/components/carousel/models/image.model';
import { Product } from 'src/app/core/models/products-response.model';

@Pipe({
  name: 'imageDataTransformer',
  standalone: true,
})
export class ImageDataTransformerPipe implements PipeTransform {
  transform(value: Product): ImageData[] {
    return value.images.map((image) => ({ image, description: value.title }));
  }
}
