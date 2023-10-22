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
    const loggedInUsername = localStorage.getItem('loggedInUser');
    if (loggedInUsername) {
        // Fetch the user ID from the backend using the username
        this.http.get(`/get-user-id/${loggedInUsername}`).subscribe({
            next: (response: any) => {
                const userId = response.userId;
                this.http.post('/group/create-group', { name: this.groupName, userId: userId })
                    .subscribe({
                        next: (response) => {
                            console.log(response);
                            alert('Group created successfully!');
                        },
                        error: (error) => {
                            console.error(error);
                            alert('Failed to create group.');
                        }
                    });
            },
            error: (error) => {
                console.error('Failed to fetch user ID:', error);
            }
        });
    } else {
        alert('User not logged in.');
    }
  }
}
