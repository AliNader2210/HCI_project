import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { AuthService } from '../auth.service';
import { ProgressService } from '../progress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit{
  courses: any = {};
  NewCourse: any = {
    title: ''
  }
  errorMessage: string | null = null
  successMessage: string | null = null
  constructor(private courseService: CourseService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadCourses();
  }
  loadCourses(): void {
    this.courseService.getInstructorCourses().subscribe(
      (courses) => (this.courses = courses),
      (error) => console.error('Error fetching courses:', error)
    );
  }
  createCourse(): void {
    this.courseService.addCourse(this.NewCourse).subscribe(() => {
      this.errorMessage = null;
      this.successMessage = 'Course created successfully!'
      this.loadCourses();
    },() => {
      this.successMessage = null;
      this.errorMessage = 'Please enter the Course Name'
    }
  );
  }
  viewProgress(courseId: string): void {
    this.router.navigate(['/progress', courseId]);
  }
}
