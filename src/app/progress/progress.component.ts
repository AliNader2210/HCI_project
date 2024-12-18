import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProgressService } from '../progress.service';
import { AuthService } from '../auth.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit{
  progressData: any[] = [];
  constructor(private courseService: CourseService) {}
  ngOnInit(): void {
    this.loadStudentProgress()
  }
  loadStudentProgress(): void {
    this.courseService.getStudentCourses().subscribe(
      (data) => {
        this.progressData = data;
        console.log('Student progress:', data);
      },
      (error) => {
        console.error('Error loading student progress:', error);
      }
    );
  }
}