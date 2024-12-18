import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCourseService {

  constructor(private http: HttpClient, private authService: AuthService) {}
  
  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/courses/get`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  addCourse(courseData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/courses/adminadd`, courseData, {
      headers: this.authService.getAuthHeaders()
    });
  }
  
  editCourse(courseId: string, courseData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/courses/edit/${courseId}`, courseData);
  }
  
  archiveCourse(courseId: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/courses/delete/${courseId}`,{
      headers: this.authService.getAuthHeaders()
    });
  }
}
