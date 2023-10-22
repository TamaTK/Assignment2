import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'; 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  public currentGroupId: string = '';

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  joinChannel(data: any) {
    this.currentGroupId = data.groupId;
    this.socket.emit('joinChannel', data);
  }

  sendMessage(message: string) {
    this.socket.emit('sendMessage', { groupId: this.currentGroupId, message: message });
  }

  receiveMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (message: any) => {
        observer.next(message);
      });
    });
  }

  userJoined(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('userJoined', (username: any) => {
        observer.next(username);
      });
    });
  }
}