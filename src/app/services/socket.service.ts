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

  sendMessage(data: any) {
    this.socket.emit('sendMessage', data.message, { groupId: data.groupId, channelId: data.channelId, userId: data.userId });
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
