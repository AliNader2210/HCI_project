import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'E-Learning_management_system';
  userRole: string | null = null
  private userRoleSubscription!: Subscription;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.userRoleSubscription = this.authService.getUserRoleObservable().subscribe((role) => {
      this.userRole = role
    })
  }
  navHeaderClick(): string{
    if(this.userRole === 'instructor'){
      return '/instructor-dashboard'
    } else if(this.userRole === 'student'){
      return '/student-dashboard'
    } else {
      return '/admin-dashboard'
    }
  }
  // Logout method (optional, can call a service)
  logout(): void {
    this.authService.logout()
    // Clear user data (example: localStorage or session)
    // localStorage.removeItem('token'); 
    // localStorage.removeItem('userRole');
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
      if(this.userRoleSubscription){
        this.userRoleSubscription.unsubscribe()
      }
  }
}
