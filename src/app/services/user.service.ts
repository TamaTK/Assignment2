import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor() {}

  // Example method to fetch user details by ID
  async getUserById(userId: string): Promise<any> {
    try {
      const response = await axios.get<any>(`${this.apiUrl}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  }
}
