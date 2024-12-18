import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { AdminCourseService } from '../admin-course.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit{
  courses: any[] = [];
  instructors: any = {}
  NewCourse: any = {
    title : '',
    instructorId: 'Select Instructor'
  }
  errorMessage: string | null = null
  successMessage: string | null = null

  constructor(private adminCourseService: AdminCourseService, private userService: UserService) { }
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
  addCourse(NewCourse: any): void {
    this.adminCourseService.addCourse(NewCourse).subscribe(
      () =>{
        this.errorMessage = null
        this.successMessage = 'Course added successfully!'
        this.loadCourses()
      },
      () => {
        this.successMessage = null
        this.errorMessage = 'Please enter a course name and select an instructor'
      }
    );
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
