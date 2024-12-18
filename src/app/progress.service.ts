import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  // Fetch progress for a specific course
  getCourseProgress(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/progress/allstudents/${courseId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
