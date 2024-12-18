import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit{
  assignmentId: string = '';
  courseId: string = ''
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}
  ngOnInit(): void {
    // Get assignment ID from route parameters
    this.assignmentId = this.route.snapshot.paramMap.get('assignmentId')!;
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
  }
  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  // Handle form submission
  onSubmit(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file to upload'
      return;
    }

    const formData = new FormData();
    formData.append('assignmentFile', this.selectedFile);
    formData.append('assignmentId', this.assignmentId);
    formData.append('courseId', this.courseId);

    // Call the service to submit the assignment
    this.assignmentService.submitAssignment(this.assignmentId, formData).subscribe(
      (response) => {
        this.successMessage = 'Assignment submitted successfully'
        console.log(response);
      },
      (error) => {
        this.errorMessage = 'You have already submitted this assignment'
      }
    );
  }
}
