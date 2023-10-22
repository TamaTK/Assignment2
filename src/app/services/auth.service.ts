import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Method for user login
  login(username: string, password: string): Observable<{ message: string; user: UserModel } | null> {
    return this.http.post<{ message: string; user: UserModel } | null>(`${this.apiUrl}/login`, {
      username,
      password,
    });
  }
}