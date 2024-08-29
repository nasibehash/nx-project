import {
  ChangeDetectionStrategy,
  Component, input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropDownComponent } from '@nx-project/ui-component';
import { Router } from '@angular/router';

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

  menuItems = [{
    name: 'MENU.HOME',
    url: '/home',
    isActive: false
  },
    {
      name: 'MENU.ABOUT',
      url: '/about',
      isActive: false
    },
    {
      name: 'MENU.CONTACT',
      url: '/contact',
      isActive: false
    },
  ];
  options = input<any>(['En', 'Fa']);

  constructor(private translateService: TranslateService, private router: Router) {
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

  goToPage(item: { name: string, url: string, isActive: boolean }) {
    const prevItem = this.menuItems.find((i) => i.isActive);
    if (prevItem) {
      prevItem.isActive = false;
    }
    item.isActive = true;
    this.router.navigateByUrl(item.url);
  }
}
