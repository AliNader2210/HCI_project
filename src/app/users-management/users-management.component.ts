import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit{
  users: any = {};
  constructor(private userService: UserService){}
    ngOnInit(): void {
      this.loadUsers();
    }
    loadUsers(): void {
      this.userService.getAllUsers().subscribe(
        (data) => {
          this.users = data;
        },
        (error) => console.error('Error fetching users:', error)
      );
    }
    approveUser(userId: string): void {
      this.userService.approveAccount(userId).subscribe(
        () => this.loadUsers(),
        (error) => console.error('Error approving user:', error)
      );
    }
    deactivateUser(userId: string): void {
      this.userService.deactivateAccount(userId).subscribe(
        () => this.loadUsers(),
        (error) => console.error('Error deactivating user:', error)
      );
    }
}
