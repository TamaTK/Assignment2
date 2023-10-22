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

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe({
        next: (groups) => {
            this.groups = groups;
        },
        error: (error) => {
            console.error(error);
            alert('Failed to fetch all groups.');
        }
    });
  }

  viewChannels(groupId: string) {
    this.router.navigate(['/channels', groupId]);  // Navigate to the channels component and pass the groupId
  }
}
