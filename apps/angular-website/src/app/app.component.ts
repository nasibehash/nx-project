import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar.component';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../libs/angular-website/data-access/theme.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, NavBarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-website';
  language: string = 'En';
  theme = true;
  private themeSubscription!: Subscription;

  constructor(private translateService: TranslateService, private themeService: ThemeService) {
    this.translateService
      .onLangChange
      .subscribe((event: any) => {
        this.language = event.lang;
      });

    this.themeService.getThemeStatus().subscribe((isDark) => {
      this.theme = isDark;
    });

  }
}
