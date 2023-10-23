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
    this.authService.login(this.username, this.password)
    .then(response => {
      console.log('Response:', response);
      if (response && response.user) {
        alert("Authentication successful");
        localStorage.setItem('loggedInUser', JSON.stringify(response.user));
        this.router.navigate(['/groups']);
      } else {
        console.error('Authentication failed');
      }
    })
    .catch(error => {
      this.errorMessage = 'Login failed. Please check your credentials.';
      console.error('An error occurred:', error);
    });
  }
}nts