import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = signal<string>('');
  update = 'init';

  ngOnInit(): void {
    this.title.set('Hello');

    setTimeout(() => {
      this.title.update((prev) => prev + 'World');
    }, 3000);
  }
}
