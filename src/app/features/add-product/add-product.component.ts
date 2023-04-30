import { Component, OnInit, effect } from '@angular/core';

@Component({
  selector: 'page-add-product',
  template: `<p>works: {{ title }}</p>`,
  standalone: true,
})
export class AddProductPageComponent implements OnInit {
  title = 'EDIT';

  constructor() {
    effect((clean) => {
      clean(() => console.log('clean edit'));
    });
  }

  ngOnInit(): void {}
}
