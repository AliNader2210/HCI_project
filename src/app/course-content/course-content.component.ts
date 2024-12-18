import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit{
  courseId: string = '';
  courseMaterials: any= {};
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService  // Service to get course content
  ) { }
  ngOnInit(): void {
    // Retrieve the course ID from the URL
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    
    // Fetch the course materials for the given course ID using your method
    this.courseService.getCourseMaterials(this.courseId).subscribe(
      data => {
        this.courseMaterials = data;
      },
      error => {
        console.error('Error fetching course materials:', error);
      }
    );
  }
}
