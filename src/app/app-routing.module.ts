import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoursesComponent } from './courses/courses.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { ProgressComponent } from './progress/progress.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { AssignmentsListComponent } from './assignments-list/assignments-list.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AssignmentManagementComponent } from './assignment-management/assignment-management.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { CourseProgressComponent } from './course-progress/course-progress.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  { path: 'student-dashboard/courses', component: CoursesComponent },  // Student's courses route
  {path:'student-dashboard', redirectTo: 'student-dashboard/courses', pathMatch:'full'},
  { path: 'student-dashboard/course/:id', component: CourseContentComponent },  // New route for course content
  { path: 'student-dashboard/assignments/:assignmentId/:courseId/submit', component: AssignmentComponent },
  { path: 'student-dashboard/progress', component: ProgressComponent },
  {path: 'instructor-dashboard/courses', component: CourseManagementComponent},
  {path: 'instructor-dashboard', redirectTo: 'instructor-dashboard/courses', pathMatch:'full'},
  { path: 'course-details/:courseId', component: CourseDetailsComponent },
  { path: 'submissions/:assignmentId', component: SubmissionsComponent},
  { path: 'progress/:courseId', component: CourseProgressComponent },
  {path: 'admin-dashboard/users', component: UsersManagementComponent},
  {path: 'admin-dashboard', redirectTo: 'admin-dashboard/users', pathMatch:'full'},
  {path: 'admin-dashboard/courses', component: AdminCoursesComponent},
  {path: 'admin-dashboard/enrollment', component: StudentEnrollmentComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' }, // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
