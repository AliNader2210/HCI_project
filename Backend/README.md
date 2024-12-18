E-Learning Management System
------------------------------------------------
Overview
This project is an E-Learning Management System API built using Node.js, Express, and MongoDB. It provides functionality for user management, course management, progress tracking, assignment handling, and more. The API supports role-based access control (Admin, Instructor, Student).
------------------------------------------------
Features
Authentication: User registration and login with JWT-based protection.
Role Management: Supports Admin, Instructor, and Student roles.
Course Management: Admins and Instructors can add, update, delete, and fetch courses.
Progress Tracking: Track progress of students in courses.
Assignment Management: Create assignments, submit assignments with file uploads, and grade assignments.
User Management: Admins can manage user data.
------------------------------------------------
API Endpoints
---------------
Authentication
---------------
Method	Endpoint	          Description	        Access
POST	/api/auth/register	  Register a new user	Public
POST	/api/auth/login	Login and get a JWT token	Public

User Management
---------------
Method	Endpoint	                Description  	      Access
POST	/api/user/create	        Create a new user	  Admin
PUT	/api/user/update/:userId	    Update user details	  Admin/User
DELETE	/api/user/delete/:userId	Delete a user	      Admin
GET	/api/user/fetch	                Fetch all users	      Admin
--------------------------------------------------------------------------------------------------------------------------------
Course Management
------------------
Method	Endpoint	            Description	               Access
POST	/api/courses/add	    Add a new course	       Admin/Instructor
GET	/api/courses/get	        Get all courses	           Protected
GET	/api/courses/getbyid/:id	Get course details by ID   Protected
PUT	/api/courses/update/:id	    Update course details	   Admin/Instructor
DELETE	/api/courses/delete/:id	Delete a course	           Admin/Instructor
GET /api/courses/instructor	 Get all courses by instructor Protected
---------------------------------------------------------------------------------------------------------------------------------
Assignment Management
----------------------
Method	Endpoint	                          Description	                  Access
POST	/api/assignment/create	              Create a new assignment	      Admin/Instructor
GET	    /api/assignment/get/:courseId	      Get assignments for a course	  Protected
POST	/api/assignment/submit/:assignmentId  Submit an assignment            Student
----------------------------------------------------------------------------------------------------------------------------------
Progress Tracking
-----------------
Method	Endpoint	                        Description	                                 Access
GET	/api/progress/:courseId	                Get progress for a course	                Protected
GET	/api/progress/allstudents	            Get all students' progress for a course	    Admin/Instructor
PUT	/api/progress/update	                Update course progress	                    Protected
GET	/api/progress/allprogress	            Get all progress of a student 	            Protected
PUT	/api/progress/gradeAssignment	        Grade an assignment	                        Admin/Instructor
PUT	/api/progress/Assigntocourse	        Assign a student to a course	            Admin
------------------------------------------------------
Middleware
-----------
Protect
Ensures the user is authenticated using a JWT token.

adminOrInstructor
Allows access only to Admins or Instructors.

admin
Allows access only to Admins.
------------------------------------------------------
Models
------
User
Fields: name, email, password, role, etc.
Roles: Admin, Instructor, Student.
Course
Fields: title, description, materials, instructor, etc.
Assignment
Fields: title, description, dueDate, course, submissions.
Progress
Fields: student, course, status, etc.
-------------------------------------------------------