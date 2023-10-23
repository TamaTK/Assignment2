import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private apiUrl = 'http://localhost:3000';

  constructor() {}

  /**
   * Fetches all channels of a specific group.
   * @param groupId - The ID of the group.
   * @returns A promise containing the channels or null if an error occurs.
   */
  async getGroupChannels(groupId: string): Promise<any> {
    try {
      const response = await axios.get<any>(`${this.apiUrl}/group/get-group-channels/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching group channels:', error);
      return null;
    }
  }

  /**
   * Creates a new channel within a specific group.
   * @param groupId - The ID of the group.
   * @param channelName - The name of the new channel.
   * @returns A promise containing the created channel or null if an error occurs.
   */
  async createChannel(groupId: string, channelName: string): Promise<any> {
    try {
      const response = await axios.post<any>(`${this.apiUrl}/group/create-channel`, { groupId, channelName });
      return response.data;
    } catch (error) {
      console.error('Error creating channel:', error);
      return null;
    }
  }
}
