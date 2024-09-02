import {
  ChangeDetectionStrategy,
  Component, inject, OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../data-access/users.service';

interface User {
  username: string;
}

@Component({
  selector: 'lib-users-list',
  standalone: true,
  imports: [CommonModule],
  providers: [UsersService],
  templateUrl: './users-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  usersService = inject(UsersService);
  users: User[] = [];

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        console.log('users', this.users);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  deleteUser(username: string): void {
    this.usersService.deleteUser(username).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.username !== username);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }
}
