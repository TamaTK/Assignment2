import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  channels: any[] = [];
  channelName: string =  '';
  loggedInUserId: string | null = '';
  selectedGroupId: string = '';  // This should be set when navigating to this component
  newMessage: string = '';
  chatMessages: any[] = [];
  selectedChannelId: string = '';

  constructor(private channelService: ChannelService,
     private route: ActivatedRoute,
     private socketService: SocketService,
     private authService: AuthService
    ){}

  ngOnInit(): void {
    this.selectedGroupId = this.route.snapshot.paramMap.get('groupId') || '';
    const loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser) {
        this.loggedInUserId = loggedInUser.id;  // Assuming '_id' is the property that holds the user ID
    }
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
    this.channelService.createChannel(this.selectedGroupId, this.channelName)
    .then(response => {
      alert('Channel created successfully!');
      this.channels.push({ name: this.channelName });
    })
    .catch(error => {
      console.error(error);
      alert('Failed to create channel.');
    });
  }

  joinChannel(channelId: string) {
    this.selectedChannelId = channelId;  // Set the selectedChannelId when joining a channel
    
    const loggedInUser = this.authService.getLoggedInUser();
    if (!loggedInUser) {
        console.error('User is not logged in.');
        return;
    }

    const data = {
        channelId: this.selectedChannelId,
        groupId: this.selectedGroupId,
        userId: loggedInUser.id  // Use the id property to get the user's ID
    };
    this.socketService.joinChannel(data);
  }
  
  onSendMessage(message: string) {
    const loggedInUser = this.authService.getLoggedInUser();
    if (!loggedInUser) {
        console.error('User is not logged in.');
        return;
    }
    console.log("selected channel id:", this.selectedChannelId);
    if (message.trim() && this.selectedChannelId) {
        const data = {
            message: message,
            groupId: this.selectedGroupId,
            channelId: this.selectedChannelId,
            userId: loggedInUser.id  // Use the id property to get the user's ID
        };
        this.socketService.sendMessage(data);
        this.chatMessages.push({ content: message, type: 'message' });
        this.newMessage = '';
    } else {
        console.error('Invalid message or channel ID.');
    }
  }
}
