import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  public currentGroupId: string = '';
  public currentChannelId: string = '';

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  joinChannel(data: any) {
    this.currentGroupId = data.groupId;
    this.currentChannelId = data.channelId;
    this.socket.emit('joinChannel', data);
  }

  sendMessage(message: string) {
    this.socket.emit('sendMessage', message, { groupId: this.currentGroupId, channelId: this.currentChannelId });
  }

  receiveMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (message: any) => {
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

  userLeft(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('userLeft', (username: any) => {
        observer.next(username);
      });
    });
  }
}
