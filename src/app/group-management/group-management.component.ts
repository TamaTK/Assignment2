import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent {
  groupName: string = '';

  constructor(private groupService: GroupService) { }

  onSubmit() {
    const loggedInUsername = localStorage.getItem('loggedInUser');

    const userId = 'YOUR_USER_ID'; // Retrieve this from your authentication logic or session
    this.groupService.createGroup(this.groupName, userId).subscribe({
      next: (response) => {
        console.log(response);
        alert('Group created successfully!');
      },
      error: (error) => {
        console.error(error);
        alert('Failed to create group.');
      }
    });
    }
  }
