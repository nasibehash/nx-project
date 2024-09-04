import {
  ChangeDetectionStrategy,
  Component, inject, OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../data-access/users.service';
import { FormsModule } from '@angular/forms';

interface User {
  username: string;
  createdDate: string;
}

@Component({
  selector: 'lib-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UsersService],
  templateUrl: './users-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  usersService = inject(UsersService);
  users: User[] = [];
  paginatedUsers: any[] = [];
  searchTerm: string = '';
  filterDate: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 1;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        this.applyFilters();
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  applyFilters(): void {
    let filteredUsers = this.users;

    if (this.searchTerm) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterDate) {
      // Assuming users have a "createdDate" field in ISO format
      filteredUsers = filteredUsers.filter((user) =>
          user.createdDate.startsWith(this.filterDate)
        // user.createdDate = this.filterDate
      );
    }

    this.totalPages = Math.ceil(filteredUsers.length / this.itemsPerPage);
    this.paginateUsers(filteredUsers);
  }

  paginateUsers(filteredUsers: any[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = filteredUsers.slice(start, end);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilterDate(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  deleteUser(username: string): void {
    this.usersService.deleteUser(username).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.username !== username);
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  }
}
