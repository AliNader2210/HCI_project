import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { AuthService } from '../auth.service';
import { ProgressService } from '../progress.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit{
  courseForm: FormGroup;
  courses: any = {};
  errorMessage: string | null = null
  successMessage: string | null = null
  constructor(private courseService: CourseService,
    private authService: AuthService,
    private router: Router
  ) {
    this.courseForm = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }
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
    if(this.courseForm.valid){
      const NewCourse = this.courseForm.value
      this.courseService.addCourse(NewCourse).subscribe(() => {
        this.errorMessage = null;
        this.successMessage = 'Course created successfully!'
        this.courseForm.reset();
        this.loadCourses();
      },() => {
        this.successMessage = null;
        this.errorMessage = 'Please try again later'
      }
    );
    }else{
      this.successMessage = null;
      this.errorMessage = 'Please fill all the fields'
    }
  }
  viewProgress(courseId: string): void {
    this.router.navigate(['/progress', courseId]);
  }
}
