import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

interface TokenPayload {
  userId: string; // Adjust according to your token structure
  role: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) {
    this.initializeUserRole()
  }
  private initializeUserRole(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userRole = decodedToken?.role || null; // Adjust key as per your JWT structure
      this.userRoleSubject.next(userRole);
    }
  }
  // Update the token (e.g., on login)
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.initializeUserRole(); // Decode and update role
  }
  // Get the current role as an observable
  getUserRoleObservable() {
    return this.userRoleSubject.asObservable();
  }
  // Get the current role as a value
  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }
  getAuthHeaders() {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      console.error('Token not found in localStorage!');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Set the Authorization header
    });
  }
  // Method for user registration
  register(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  // Method for user login
  login(credentials: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials);
  }
  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: TokenPayload = jwt_decode(token);
      return decodedToken.userId;
    }
    return null; // No token found
  }
  // getUserRole(): string | null {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decodedToken: TokenPayload = jwt_decode(token);
  //     return decodedToken.role;
  //   }
  //   return null; // No token found
  // }
  logout(): void {
    localStorage.removeItem('token');
    this.userRoleSubject.next(null); // Clear role
  }
}
