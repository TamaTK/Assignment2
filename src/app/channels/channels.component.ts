import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  channels: any[] = [];
  channelName: string = '';
  selectedGroupId: string = '';  // This should be set when navigating to this component

  constructor(private channelService: ChannelService) { }

  ngOnInit(): void {
    this.channelService.getGroupChannels(this.selectedGroupId).subscribe({
      next: (response) => {
        this.channels = response;
      },
      error: (error) => {
        console.error(error);
        alert('Failed to fetch channels.');
      }
    });
  }

  
  createChannel() {
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
}
