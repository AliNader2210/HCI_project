import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch all courses a student is enrolled in
  getStudentCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/progress/allprogress`, {
      headers: this.authService.getAuthHeaders()
    })
  }
  // Fetch materials for a specific course
  getCourseMaterials(courseId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/courses/getbyid/${courseId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  addCourse(courseData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/courses/add`, courseData, {
      headers: this.authService.getAuthHeaders()
    });
  }
  addCourseMaterial(courseId: string, material: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/courses/edit/${courseId}`, material,{
      headers: this.authService.getAuthHeaders()
    });
  }
  getInstructorCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/courses/instructor`,{
      headers: this.authService.getAuthHeaders()
    });
  }
}
