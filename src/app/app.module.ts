import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { CoursesComponent } from './courses/courses.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { ProgressComponent } from './progress/progress.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { HttpClientModule } from '@angular/common/http';
import { AssignmentsListComponent } from './assignments-list/assignments-list.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AssignmentManagementComponent } from './assignment-management/assignment-management.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { CourseProgressComponent } from './course-progress/course-progress.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    AssignmentComponent,
    ProgressComponent,
    CourseContentComponent,
    AssignmentsListComponent,
    CourseManagementComponent,
    CourseDetailsComponent,
    AssignmentManagementComponent,
    SubmissionsComponent,
    CourseProgressComponent,
    UsersManagementComponent,
    AdminCoursesComponent,
    StudentEnrollmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
