import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { AuthService } from '../services/auth.service';  // Import AuthService

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: any[] = [];
  userId: string = '';  // Initialize as an empty string

  constructor(private groupService: GroupService, private authService: AuthService) { }  // Inject AuthService

  ngOnInit(): void {
    const loggedInUser = this.authService.getLoggedInUser();  // Fetch the logged-in user's details
    if (loggedInUser) {
      this.userId = loggedInUser._id;  // Set the userId
    }

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
