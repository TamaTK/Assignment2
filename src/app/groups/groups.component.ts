import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { AuthService } from '../services/auth.service';  // Import AuthService
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: any[] = [];
  userId: string = '';  // Initialize as an empty string

  constructor(private groupService: GroupService, private authService: AuthService, private router: Router) { }  // Inject AuthService

  /**
   * Initialize the component by fetching and displaying groups.
   */
  ngOnInit(): void {
    this.groupService.getAllGroups()
      .then(groups => {
        this.groups = groups;
      })
      .catch(error => {
        console.error(error);
        alert('Failed to fetch all groups.');
      });
  }

  /**
   * Navigate to the channels component with the specified groupId.
   * @param groupId - The ID of the group to view channels for.
   */
  viewChannels(groupId: string) {
    this.router.navigate(['/channels', groupId]);  // Navigate to the channels component and pass the groupId
  }
}
