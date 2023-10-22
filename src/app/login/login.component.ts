import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Login method called')
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Next callback called with response:', response);
        if (response && response.user) {
          // Authentication successful, navigate to the groups page
          alert("Authentication successful");
          this.router.navigate(['/groups']);
          // login storage
          localStorage.setItem('loggedInUser', this.username);
        } else {
          // Authentication failed, handle the error or display an error message
          console.error('Authentication failed');
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Error callback called with error:', error);
        console.error('An error occurred:', error);
      },
    });
  }
}