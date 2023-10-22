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
    this.groupService.getUserGroups(this.userId).subscribe({
      next: (response) => {
        this.groups = response.groups;
      },
      error: (error) => {
        console.error(error);
        alert('Failed to fetch groups.');
      }
    });
  }
}

