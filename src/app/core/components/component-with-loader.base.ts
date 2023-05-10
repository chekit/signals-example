import { BehaviorSubject, Observable, share } from 'rxjs';

export class ComponentWithLoaderBase {
  protected isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );
  isLoading$: Observable<boolean> = this.isLoadingSubject
    .asObservable()
    .pipe(share());
}
