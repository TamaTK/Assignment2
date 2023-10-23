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

  login(username: string, password: string): Promise<any> {
    return axios.post(`${this.apiUrl}/login`, { username, password })
    .then(response => {
        if (response.data && response.data.token) {
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token); // Storing the token
            this.userRole.next(response.data.user.role); // Update the BehaviorSubject with the user's role
        }
        return response.data;
    });
}

  getLoggedInUser(): UserModel | null {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }
}
