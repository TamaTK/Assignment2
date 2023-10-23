import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserModel } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private userRole = new BehaviorSubject<string>(''); // Initialize with an empty role
  currentRole = this.userRole.asObservable();

  constructor() {}

  /**
   * Attempt to log in a user with the provided credentials.
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns A Promise that resolves with the authentication response.
   */
  async login(username: string, password: string): Promise<any> {
    const response = await axios.post(`${this.apiUrl}/login`, { username, password });
    if (response.data) {
      // Store user and token in localStorage
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      console.log(localStorage.setItem('currentUser', JSON.stringify(response.data.user)))
      // Update the BehaviorSubject with the user's role
      this.userRole.next(response.data.user.role);
    }
    return response.data;
  }

  /**
   * Retrieve the logged-in user from localStorage.
   * @returns The logged-in user or null if not found.
   */
  getLoggedInUser(): UserModel | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}
