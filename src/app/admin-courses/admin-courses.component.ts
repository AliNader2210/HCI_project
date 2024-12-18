import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { AdminCourseService } from '../admin-course.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit{
  courseForm: FormGroup;
  courses: any[] = [];
  instructors: any = {}
  errorMessage: string | null = null
  successMessage: string | null = null

  constructor(private adminCourseService: AdminCourseService, private userService: UserService) {
    this.courseForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      instructorId: new FormControl('Select Instructor', [Validators.required])
    });
  }
  ngOnInit(): void {
    this.loadCourses();
    this.loadInstructors();
  }
  loadCourses(): void {
    this.adminCourseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => console.error('Error fetching courses:', error)
    );
  }
  loadInstructors(): void {
    this.userService.getInstructors().subscribe(
      (data) => {
        this.instructors = data
      },
      (error) => console.error('Error fetchingInstructors:', error)
    )
  }
  addCourse(): void {
    if(this.courseForm.valid){
      const NewCourse = this.courseForm.value
      this.adminCourseService.addCourse(NewCourse).subscribe(
        () =>{
          this.errorMessage = null
          this.successMessage = 'Course added successfully!'
          this.loadCourses()
        },
        () => {
          this.successMessage = null
          this.errorMessage = 'Please try again later'
        }
      );
    }else{
      this.successMessage = null
      this.errorMessage = 'Please enter a course name and select an instructor'
    }
  }
  archiveCourse(courseId: string): void {
    this.adminCourseService.archiveCourse(courseId).subscribe(
      () =>{
        this.errorMessage = null
        this.successMessage = 'Course archived successfully!'
        this.loadCourses()
      },
      (error) => console.error('Error archiving course:', error)
    );
  }
}
