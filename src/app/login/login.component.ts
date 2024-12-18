import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }
  userRole = ''
  errorMessage : string | null = null
  showPassword:boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  login(){
    this.authService.login(this.credentials).subscribe(
      (res: any) => {
        // Save the token using AuthService
        this.authService.setToken(res.token); // Decode and update the user role
        // Fetch the updated role
        this.userRole = this.authService.getUserRole()!;
        if(this.userRole === 'instructor'){
          this.router.navigate(['/instructor-dashboard']);
        }
        else if(this.userRole === 'student'){
          this.router.navigate(['/student-dashboard']);
        }
        else{
          this.router.navigate(['/admin-dashboard']);
        }
      },
      (err) => {
        // Handle errors
        this.errorMessage = 'Invalid username or password'
      }
    );
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

