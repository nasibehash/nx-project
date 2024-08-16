import { Injectable } from '@angular/core';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(){
    const users  = localStorage.getItem('users');
    if (!users) {
      localStorage.setItem('users', JSON.stringify([{ username: 'test', password: 'test' }]));
    }
  }
  register(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: User) => u.username === username);

    if (!userExists) {
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  }

  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.username === username && u.password === password);
    if (user) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
