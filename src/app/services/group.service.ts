import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Method to create a new group
  createGroup(groupName: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/group/create-group`, {
      name: groupName,
      userId: userId,
    });
  }

  // Add more methods related to group management as needed
}