import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { UiButtonComponent } from '@nx-project/angular-ui';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule,UiButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-website';
}
