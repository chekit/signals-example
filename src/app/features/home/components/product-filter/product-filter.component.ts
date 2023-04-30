import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'products-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductsFilterComponent implements OnInit {
  @Output() termChange: EventEmitter<string> = new EventEmitter();

  filterInput: FormControl<string> = new FormControl();

  ngOnInit(): void {
    this.filterInput.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((value) => this.termChange.emit(value));
  }
}
