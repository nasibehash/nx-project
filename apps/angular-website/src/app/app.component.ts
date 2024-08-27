import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar.component';
import localeEn from '@angular/common/locales/en';
import localeFa from '@angular/common/locales/fa';
import { Location, registerLocaleData } from '@angular/common';

// Register locales
registerLocaleData(localeFa, 'fa');
registerLocaleData(localeEn, 'en');
@Component({
  standalone: true,
  imports: [RouterModule, NavBarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-website';
  constructor(private location: Location) {}

  switchLanguage(lang: string) {
    // Change the language by updating the path
    const url = this.location.path().replace(/\/(en|fa)/, `/${lang}`);
    window.location.href = url;
  }

}
