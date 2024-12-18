import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assignment-management',
  templateUrl: './assignment-management.component.html',
  styleUrls: ['./assignment-management.component.css']
})
export class AssignmentManagementComponent implements OnInit{
  assignmentForm: FormGroup;
  courseId: string = ''
  assignments: any[] = [];
  errorMessage: string | null = null
  successMessage: string | null = null
  constructor(private assignmentService: AssignmentService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
      this.assignmentForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        dueDate: new FormControl('', [Validators.required])
      });
    }
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
    if(this.assignmentForm.valid){
      const newAssignment = this.assignmentForm.value
      this.assignmentService.addCourseAssignment(this.courseId, newAssignment).subscribe(
        () => {
          // Clear the input fields
          this.assignmentForm.reset()
          this.errorMessage = null
          this.successMessage = 'Assignment added successfully'
          this.loadAssignments()
        },
        (error) => {
          this.successMessage = null
          this.errorMessage = 'Please try again later'
        }
      );
    } else {
      this.successMessage = null
      this.errorMessage = 'Please fill all the fields'
    }
  }
}
