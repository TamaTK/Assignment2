import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://localhost:3000';

  constructor() {}

  /**
   * Creates a new group.
   * @param groupName - The name of the new group.
   * @param userId - The ID of the user creating the group.
   * @returns A promise containing the created group or null if an error occurs.
   */
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

  /**
   * Fetches all available groups.
   * @returns A promise containing all groups or null if an error occurs.
   */
  async getAllGroups(): Promise<any> {
    try {
      const response = await axios.get<any>(`${this.apiUrl}/group/all-groups`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all groups:', error);
      return null;
    }
  }

  /**
   * Allows a user to join a specific group.
   * @param groupId - The ID of the group to join.
   * @param userId - The ID of the user joining the group.
   * @returns A promise containing the updated group or null if an error occurs.
   */
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

  /**
   * Fetches all channels of a specific group.
   * @param groupId - The ID of the group.
   * @returns A promise containing the channels of the group or null if an error occurs.
   */
  async getChannels(groupId: string): Promise<any> {
    try {
      const response = await axios.get<any>(`${this.apiUrl}/group/channels/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching group channels:', error);
      return null;
    }
  }

  /**
   * Fetches all groups that a specific user is a part of.
   * @param userId - The ID of the user.
   * @returns A promise containing the user's groups or null if an error occurs.
   */
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
