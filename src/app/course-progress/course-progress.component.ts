import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'app-course-progress',
  templateUrl: './course-progress.component.html',
  styleUrls: ['./course-progress.component.css']
})
export class CourseProgressComponent implements OnInit{
  courseId: string = '';
  courseProgress: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private progressService: ProgressService
  ) {}
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.fetchCourseProgress();
  }
  fetchCourseProgress(): void {
    this.progressService.getCourseProgress(this.courseId).subscribe(
      (data) => {
        this.courseProgress = data;
      },
      (error) => {
        console.error('Error fetching course progress:', error);
      }
    );
  }
}
