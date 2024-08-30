import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = false;
  private themeSubject: BehaviorSubject<boolean>;

  constructor() {
    // Load the initial theme
    const theme = localStorage.getItem('theme');
    this.themeSubject = new BehaviorSubject<boolean>(this.darkTheme);
    this.darkTheme = theme === 'dark';
  }

  toggleTheme(isDark: boolean): void {
    this.darkTheme = isDark;
    localStorage.setItem('theme', this.darkTheme ? 'dark' : 'light');
    this.themeSubject.next(this.darkTheme);

  }

  getThemeStatus(): Observable<boolean> {
    return this.themeSubject.asObservable();
  }

}
