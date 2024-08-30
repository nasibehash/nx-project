import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../../data-access/theme.service';

@Component({
  selector: 'lib-landing-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {
  constructor(private themeService: ThemeService) {
  }

  changeTheme(isDark: boolean) {
    this.themeService.toggleTheme(isDark);
  }
}
