import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignment-management',
  templateUrl: './assignment-management.component.html',
  styleUrls: ['./assignment-management.component.css']
})
export class AssignmentManagementComponent implements OnInit{
  newAssignment: any = {title: '', description: '', dueDate: ''} ;
  courseId: string = ''
  assignments: any[] = [];
  errorMessage: string | null = null
  successMessage: string | null = null
  constructor(private assignmentService: AssignmentService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {}
  ngOnInit(): void {
      this.courseId = this.route.snapshot.paramMap.get('courseId')!;
      this.loadAssignments();
  }
  loadAssignments(): void {
    this.assignmentService.getCourseAssignments(this.courseId).subscribe(
      (data) => (this.assignments = data),
      (error) => console.error('Error fetching assignments:', error)
    );
  }
  viewSubmissions(assignmentId: string): void {
    this.router.navigate(['/submissions', assignmentId]);
  }
  addAssignment(){
    if(this.courseId && this.newAssignment.title && this.newAssignment.description && this.newAssignment.dueDate){
      this.assignmentService.addCourseAssignment(this.courseId, this.newAssignment).subscribe(
        () => {
          // Clear the input fields
          this.newAssignment = {title: '', description: '', dueDate: ''};
          this.errorMessage = null
          this.successMessage = 'Assignment added successfully'
          this.loadAssignments()
        },
        (error) => {
          this.successMessage = null
          this.errorMessage = 'Please fill all the fields'
        }
      );
    } else {
      this.successMessage = null
      this.errorMessage = 'Please fill all the fields'
    }
  }
}
