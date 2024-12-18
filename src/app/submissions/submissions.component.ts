import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {
  submissions: any = {};
  studentId: string = ''
  assignmentId: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}
  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get('assignmentId')!;
    this.fetchSubmissions();
  }
  fetchSubmissions(): void {
    this.assignmentService.getAssignmentSubmissions(this.assignmentId).subscribe(
      (data) => {
        this.submissions = data;
      },
      (error) => {
        console.error('Error fetching submissions:', error);
      }
    );
  }
  gradeSubmission(studentId: string, grade: number): void {
    this.assignmentService.updateSubmissionGrade(this.assignmentId, studentId, grade).subscribe(
      () => {
        this.successMessage = 'Submission grade updated successfully'
      },
      () => {
        this.errorMessage = 'Error updating submission grade'
      }
    );
  }
}
