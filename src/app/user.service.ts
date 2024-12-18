import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http: HttpClient, private authService: AuthService) {}

  approveAccount(userId: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/activate/${userId}`, {}, {
      headers: this.authService.getAuthHeaders()
    });
  }
  deactivateAccount(userId: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/user/delete/${userId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/user/fetch`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/user/getstudents`, {
      headers: this.authService.getAuthHeaders()
    });
  }
  getInstructors(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/user/getinstructors`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
