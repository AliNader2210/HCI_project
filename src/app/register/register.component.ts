import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  userForm: FormGroup 
  errorMessage : string | null = null
  showPassword: boolean = false
  constructor(private authService: AuthService, private router: Router) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      telephone: new FormControl(Validators.required),
      gender: new FormControl('male'),
      role: new FormControl('student')
    });
  }
  // Method triggered when the form is submitted
  register() {
    if(this.userForm.valid){
      const user = this.userForm.value
      this.authService.register(user).subscribe(
        (res) => {
          this.router.navigate(['/login']); // Redirect to login page
        },
        (err) => {
          // Handle errors (e.g., email already exists)
          this.errorMessage = 'Please try again'
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

