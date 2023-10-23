import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://localhost:3000';

  constructor() {}

  async createGroup(groupName: string, userId: string): Promise<any> {
    try {
      const response = await axios.post<any>(`${this.apiUrl}/group/create-group`, {
        name: groupName,
        userId: userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      return null;
    }
  }

  async getAllGroups(): Promise<any> {
    try {
      const response = await axios.get<any>(`${this.apiUrl}/group/all-groups`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all groups:', error);
      return null;
    }
  }

  async joinGroup(groupId: string, userId: string): Promise<any> {
    try {
      const response = await axios.post<any>(`${this.apiUrl}/group/join-group`, {
        groupId,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error joining group:', error);
      return null;
    }
  }

  async getChannels(groupId: string): Promise<any> {
    try {
      const response = await axios.get<any>(`${this.apiUrl}/group/channels/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching group channels:', error);
      return null;
    }
  }

  async getUserGroups(userId: string): Promise<any> {
    try {
      const response = await axios.get<any>(`${this.apiUrl}/group/get-user-groups/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user groups:', error);
      return null;
    }
  }
}
