import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/models/products-response.model';
import { ImageData } from '../components/carousel/models/image.model';

@Pipe({
  name: 'imageDataTransformer',
  standalone: true,
})
export class ImageDataTransformerPipe implements PipeTransform {
  transform(value: Product): ImageData[] {
    return value.images.map((image) => ({ image, description: value.title }));
  }
}
