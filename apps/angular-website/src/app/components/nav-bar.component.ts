import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nav-bar.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  hiddenMenu: boolean = true;
  language: string = 'en';

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['en', 'fa']);
    translateService.setDefaultLang('en');
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
