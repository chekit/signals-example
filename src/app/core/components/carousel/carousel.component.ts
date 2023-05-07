import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

  currentIndex = 0;

  setCurrentSlideIndex(index: number) {
    this.currentIndex = index;
  }

  isCurrentSlideIndex(index: number) {
    return this.currentIndex === index;
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex < this.slides.length - 1 ? ++this.currentIndex : 0;
  }

  nextSlide() {
    this.currentIndex =
      this.currentIndex > 0 ? --this.currentIndex : this.slides.length - 1;
  }
}
