import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupModel } from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Existing method to create a group
  createGroup(groupName: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/group/create-group`, {
      name: groupName,
      userId: userId,
    });
  }


  getAllGroups(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/group/all-groups`);
  }


  joinGroup(groupId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/group/join-group`, {
      groupId,
      userId,
    });
  }


  createChannel(groupId: string, channelName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/group/create-channel`, {
      groupId,
      channelName,
    });
  }


  getChannels(groupId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/group/channels/${groupId}`);
  }

  getUserGroups(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/group/get-user-groups/${userId}`);
  }
}
