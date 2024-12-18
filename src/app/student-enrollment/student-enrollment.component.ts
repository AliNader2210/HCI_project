import { Component } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { UserService } from '../user.service';
import { AdminCourseService } from '../admin-course.service';

@Component({
  selector: 'app-student-enrollment',
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.css']
})
export class StudentEnrollmentComponent {
  students: any = {};
  courses: any[] = [];
  selectedStudentId: string = 'Select a Student';
  selectedCourseId: string = 'Select a Course to be Assigned';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private enrollmentService: EnrollmentService,
    private userService: UserService,
    private adminCourseService: AdminCourseService,
  ){}
  ngOnInit(): void {
    this.loadUsers();
    this.loadCourses();
  }
  loadUsers(): void {
    this.userService.getStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => console.error('Error fetching users:', error)
    );
  }

  loadCourses(): void {
    this.adminCourseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => console.error('Error fetching courses:', error)
    );
  }
  assignStudentToCourse(): void {
    if (this.selectedStudentId && this.selectedCourseId) {
      this.enrollmentService.assignStudentToCourse(this.selectedStudentId, this.selectedCourseId).subscribe(
        () => {
          this.errorMessage = null;
          this.successMessage = 'Student assigned successfully';
        },
        () => {
          this.successMessage = null
          this.errorMessage = 'Student already assigned to this course'
        }
      );
    } else {
      this.successMessage = null;
      this.errorMessage = 'Please select a student and a course'
    }
  }
}
