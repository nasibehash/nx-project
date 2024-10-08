import {
  ChangeDetectionStrategy,
  Component, inject, OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@nx-project/user';
import { Router } from '@angular/router';
import { SidebarItem } from '../../sandbox/models/Side-bar-items.model';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);

  sidebarItems: SidebarItem[] = [
    {text: 'home', icon: 'H', link: '/home'},
    {text: 'users', icon: 'U', link: '/users'},
    {text: 'packages', icon: 'U', link: '/packages'},
    {text: 'groups', icon: 'G', link: '/groups'},
  ];

  ngOnInit() {
    this.activeateCurrentUrl();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  navigate(item: SidebarItem) {
    const prevItem = this.sidebarItems.find((i) => i.isActive);
    if (prevItem) {
      prevItem.isActive = false;
    }
    item.isActive = true;
    this.router.navigate([`${item.link}`]);
  }

  private activeateCurrentUrl(): void {
    const currentUrl = this.router.url;
    this.sidebarItems.forEach(menuItem => {
      if (currentUrl.includes(menuItem.link!)) {
        menuItem.isActive = true;
      }
      // menuItem.subMenu.forEach(subMenuItem => {
      //   if (currentUrl.includes(subMenuItem.link!)) {
      //     menuItem.showSubmenu = true;
      //     subMenuItem.showSubmenu = true;
      //   }
      // });
    });
  }
}
