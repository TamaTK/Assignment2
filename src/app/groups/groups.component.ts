import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: any[] = [];
  userId: string = 'YOUR_USER_ID'; // Fetch this from your authentication/session logic

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe({
      next: (response) => {
        this.groups = response;
      },
      error: (error) => {
        console.error(error);
        alert('Failed to fetch groups.');
      }
    });
  }

  joinGroup(groupId: string): void {
    this.groupService.joinGroup(groupId, this.userId).subscribe({
      next: (response) => {
        alert('Joined group successfully!');
      },
      error: (error) => {
        console.error(error);
        alert('Failed to join group.');
      }
    });
  }
}

