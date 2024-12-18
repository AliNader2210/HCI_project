import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    telephone: null,
    gender: 'male',
    role: 'student'
  }
  errorMessage : string | null = null
  showPassword: boolean = false
  constructor(private authService: AuthService, private router: Router) {}

  // Method triggered when the form is submitted
  register() {
    this.authService.register(this.user).subscribe(
      (res) => {
        this.router.navigate(['/login']); // Redirect to login page
      },
      (err) => {
        // Handle errors (e.g., email already exists)
        this.errorMessage = 'Please fill all your credentials!'
      }
    );
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

