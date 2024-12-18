import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup
  userRole = ''
  errorMessage : string | null = null
  showPassword:boolean = false;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login(){
    if (this.loginForm.valid){
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe(
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
    }else{
      this.errorMessage = 'Please fill all your credentials!'
    }
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

