import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit{
  courseId: string | null = null;
  courseMaterials: any = {};
  newMaterial: any = {materialstype: '', materialtitle: '', materialsurl: ''};
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private assignmentService: AssignmentService
  ) {}
  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    if (this.courseId) {
      this.loadCourseDetails(this.courseId);
    }
  }
  loadCourseDetails(courseId: string): void {
    this.courseService.getCourseMaterials(courseId).subscribe(
      (data) => (this.courseMaterials = data),
      (error) => console.error('Error loading course details:', error)
    );
  }
  addMaterial(): void {
    if (this.courseId && this.newMaterial.materialstype && this.newMaterial.materialtitle && this.newMaterial.materialsurl) {
      this.courseService.addCourseMaterial(this.courseId, this.newMaterial).subscribe(
        () => {
          this.errorMessage = null
          this.successMessage = 'Material added successfully.'
          // Reload the course materials
          this.loadCourseDetails(this.courseId!);
        },
        () => {
          this.successMessage = null
          this.errorMessage = 'Please fill in all required fields.'
        }
      );
    } else {
      this.successMessage = null
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
