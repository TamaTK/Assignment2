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

  /**
   * Handle the form submission to create a new group.
   */
  onSubmit() {
    // Parse the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    
    // Extract the userId from the user object
    const userId = loggedInUser.id;

    if (userId) {
      // Call the group service to create a new group
      this.groupService.createGroup(this.groupName, userId)
        .then(response => {
          console.log(response);
          alert('Group created successfully!');
        })
        .catch(error => {
          console.error(error);
          alert('Failed to create group.');
        });
    }
  }
}
