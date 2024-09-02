import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  register(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    const body = {username, password};
    return this.http.post(url, body);
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const body = {username, password};

    return this.http.post<any>(url, body).pipe(
      tap(response => {
        if (response.token) {
          // Store the token
          localStorage.setItem('authToken', response.token);
          this.setLogoutTimer(response.token);
          this.isAuthenticatedSubject.next(true); // Update authentication status
        }
      })
    );
  }

  logout(): void {
    // Remove the token
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false); // Update authentication status
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      const expirationDate = this.getTokenExpirationDate(token);
      if (expirationDate && expirationDate > new Date()) {
        this.setLogoutTimer(token); // Ensure logout timer is set if token is still valid
        return true;
      } else {
        this.logout(); // Token expired, clear the session
      }
    }
    return false;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error('Failed to decode token:', e);
      return null;
    }
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded = this.decodeToken(token);
    if (decoded && decoded.exp) {
      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    }
    return null;
  }

  private setLogoutTimer(token: string): void {
    const expirationDate = this.getTokenExpirationDate(token);
    if (expirationDate) {
      const expiresIn = expirationDate.getTime() - new Date().getTime();
      setTimeout(() => this.logout(), expiresIn); // Log out after token expires
    }
  }
}
