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
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');  // Parse the string to get the user object
    const userId = loggedInUser.id;  // Extract the userId from the user object
  
    if (userId) {
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
    } else {
      alert('Failed to fetch user ID. Please ensure you are logged in.');
    }
  }
}
