import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { ImageData } from './models/image.model';
import { slideAnimation } from './slide.animation';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [slideAnimation],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  @Input() slides: ImageData[] = [];

  slideIndex = signal(0);

  setCurrentSlideIndex(index: number) {
    this.slideIndex.set(index);
  }

  isCurrentSlideIndex(index: number) {
    return this.slideIndex() === index;
  }

  prevSlide() {
    this.slideIndex.update((prevState) => {
      return prevState < this.slides.length - 1 ? ++prevState : 0;
    });
  }

  nextSlide() {
    this.slideIndex.update((prevState) => {
      return prevState > 0 ? --prevState : this.slides.length - 1;
    });
  }
}
