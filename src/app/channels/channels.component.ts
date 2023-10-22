import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  channels: any[] = [];
  channelName: string = '';
  selectedGroupId: string = '';  // This should be set when navigating to this component
  newMessage: string = '';
  chatMessages: any[] = [];
  selectedChannelId: string = '';
  constructor(private channelService: ChannelService, private route: ActivatedRoute,private socketService: SocketService) { }

  ngOnInit(): void {
    this.selectedGroupId = this.route.snapshot.paramMap.get('groupId') || '';
    console.log('OnInit - selectedGroupId:', this.selectedGroupId);
    this.channelService.getGroupChannels(this.selectedGroupId).subscribe({
      next: (response) => {
        this.channels = response;
      },
      error: (error) => {
        console.error(error);
        alert('Failed to fetch channels.');
      }
    });
    // Listen for user join notifications
    this.socketService.userJoined().subscribe((username) => {
    this.chatMessages.push({ content: `${username} has joined the channel.`, type: 'notification' });
    });

    // Listen for user leave notifications
    this.socketService.userLeft().subscribe((username) => {
      this.chatMessages.push({ content: `${username} has left the channel.`, type: 'notification' });
    });

  // Listen for new messages
    this.socketService.receiveMessage().subscribe((message) => {
      this.chatMessages.push(message);
    });
  }


  createChannel() {
    console.log('createChannel - Before API call');
    console.log('selectedGroupId:', this.selectedGroupId);
    console.log('channelName:', this.channelName);
    this.channelService.createChannel(this.selectedGroupId, this.channelName).subscribe({
      next: (response) => {
        alert('Channel created successfully!');
        this.channels.push({ name: this.channelName });  // Add the new channel to the list
      },
      error: (error) => {
        console.error(error);
        alert('Failed to create channel.');
      }
    });
  }

  joinChannel(channelId: string) {
    const data = {
        channelId: channelId,
        groupId: this.selectedGroupId,  // Pass the group ID
        username: 'YourUsername'  // Replace with the actual username
    };
    this.socketService.joinChannel(data);
  }
  
  onSendMessage(message: string) {
    if (message.trim()) {
        this.socketService.sendMessage(message);
        this.chatMessages.push({ content: message, type: 'message' });  // Add the message to the chatMessages array
        this.newMessage = '';  // Clear the input field
    }
  }
}
