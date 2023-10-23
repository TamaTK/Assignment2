import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserModel } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';
  private userRole = new BehaviorSubject<string>(''); // Initialize with an empty role
  currentRole = this.userRole.asObservable();
  constructor() {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('userRole', response.user.role); // Storing user's role
          this.currentUserSubject.next(response.user);
        }
        return response;
      })
    );
  }

  getLoggedInUser(): UserModel | null {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }
}
