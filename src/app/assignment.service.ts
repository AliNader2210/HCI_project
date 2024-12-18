import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch all assignments for the given courseId
  getCourseAssignments(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/assignment/get/${courseId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  // Method to upload an assignment submission
  submitAssignment(assignmentId: string, formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/assignment/submit/${assignmentId}`, formData,{
      headers: this.authService.getAuthHeaders()
    });
  }
  getAssignmentSubmissions(assignmentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/assignment/getSubmissions/${assignmentId}`,{
      headers: this.authService.getAuthHeaders()
    });
  }

  updateSubmissionGrade(assignmentId: string, studentId: string ,submission: number): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/progress/gradeAssignment/${assignmentId}/${studentId}`,{submission},{
      headers: this.authService.getAuthHeaders()
    });
  }  
  addCourseAssignment(courseId: string, newAssignment: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/assignment/create/${courseId}`, newAssignment, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
