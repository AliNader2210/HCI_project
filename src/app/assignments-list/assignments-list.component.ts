import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.css']
})
export class AssignmentsListComponent implements OnInit{
  courseId: string = '';
  assignments: any[] = [];
 constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
  ) {}
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.fetchAssignments();
  }
  fetchAssignments(): void {
    this.assignmentService.getCourseAssignments(this.courseId).subscribe(
      (data) => {
        this.assignments = data;
      },
      (error) => {
        console.error('Error fetching assignments', error);
      }
    );
  }
}
