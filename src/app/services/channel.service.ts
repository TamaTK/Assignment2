import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Fetch channels of a group
  getGroupChannels(groupId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/channel/get-group-channels/${groupId}`);
  }

  // Create a new channel within a group
  createChannel(groupId: string, channelName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/channel/create-channel`, { groupId, channelName });
  }
}