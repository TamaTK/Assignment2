import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor() {}

  async login(username: string, password: string): Promise<{ message: string; user: UserModel } | null> {
    try {
      const response = await axios.post<{ message: string; user: UserModel } | null>(`${this.apiUrl}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  }

  getLoggedInUser(): UserModel | null {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }
}
