import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let spectator: Spectator<NotificationComponent>;
  let component: NotificationComponent;

  const createComponent = createComponentFactory({
    component: NotificationComponent,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
