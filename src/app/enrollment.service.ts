import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  assignStudentToCourse(studentId: string, courseId: string): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/progress/Assigntocourse`, { studentId, courseId },{
      headers: this.authService.getAuthHeaders()
    });
  }
}
