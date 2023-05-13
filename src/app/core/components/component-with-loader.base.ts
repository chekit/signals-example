import { signal } from '@angular/core';

export class ComponentWithLoaderBase {
  isLoading = signal(false);
}
