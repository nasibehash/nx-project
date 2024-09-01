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
    return !!localStorage.getItem('authToken');
  }
}
