import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent {
  groupName: string = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
      const userId = 'YOUR_USER_ID'; // Retrieve this from your authentication logic or session
      this.http.post('/group/create-group', { name: this.groupName, userId: userId })
          .subscribe(
              response => {
                  console.log(response);
                  alert('Group created successfully!');
              },
              error => {
                  console.error(error);
                  alert('Failed to create group.');
              }
          );
  }
}
