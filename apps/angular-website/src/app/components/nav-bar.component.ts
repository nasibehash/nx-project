import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  hiddenMenu: boolean = true;

  openMenu() {
    this.hiddenMenu = !this.hiddenMenu;
  }

  closeMenu() {
    this.hiddenMenu = true;
  }
}
