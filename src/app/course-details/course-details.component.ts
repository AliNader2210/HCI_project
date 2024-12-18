import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { AssignmentService } from '../assignment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit{
  materialForm: FormGroup;
  courseId: string | null = null;
  courseMaterials: any = {};
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.materialForm = new FormGroup({
      materialstype: new FormControl('', [Validators.required]),
      materialtitle: new FormControl('', [Validators.required]),
      materialsurl: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]) // URL validation
    });
  }
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
    if (this.materialForm.valid) {
      const newMaterial = this.materialForm.value
      this.courseService.addCourseMaterial(this.courseId!, newMaterial).subscribe(
        () => {
          this.errorMessage = null
          this.successMessage = 'Material added successfully.'
          this.materialForm.reset()
          // Reload the course materials
          this.loadCourseDetails(this.courseId!);
        },
        () => {
          this.successMessage = null
          this.errorMessage = 'please try again later'
        }
      );
    } else {
      this.successMessage = null
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
