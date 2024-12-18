import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  constructor(
    private courseService: CourseService,
  ) {}
  ngOnInit(): void {
    this.loadCourses();
  } 
  loadCourses(): void {
    this.courseService.getStudentCourses().subscribe((data) => {
      this.courses = data;
    }, error => {
      // Handle error fetching courses (e.g., show an error message)
      console.error('Error loading courses:', error);
    });
  }
}
