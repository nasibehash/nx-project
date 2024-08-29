import {
  ChangeDetectionStrategy,
  Component, input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropDownComponent } from '@nx-project/ui-component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule, DropDownComponent],
  templateUrl: './nav-bar.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  hiddenMenu: boolean = true;
  language: string = 'En';
  options = input<any>(['En', 'Fa']);

  constructor(private translateService: TranslateService) {
    translateService.addLangs(this.options());
    translateService.setDefaultLang('En');
  }

  switchLang(lang: string) {
    this.translateService.use(lang);
    this.language = lang;
  }

  openMenu() {
    this.hiddenMenu = !this.hiddenMenu;
  }

  closeMenu() {
    this.hiddenMenu = true;
  }
}
