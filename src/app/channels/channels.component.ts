import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  channels: any[] = [];
  channelName: string = '';
  selectedGroupId: string = '';  // This should be set when navigating to this component

  constructor(private channelService: ChannelService, private route: ActivatedRoute) { }

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
}
