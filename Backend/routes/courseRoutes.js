const express = require('express');
const { addCourses,adminaddCourses ,getCourses, getCourseByID, deleteCourse, getCourseByInstructor,editCourse } = require('../controllers/courseController');
const { protect, adminOrInstructor, admin} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', protect, adminOrInstructor, addCourses);
router.post('/adminadd', protect, admin, adminaddCourses); 
router.get('/get', protect, getCourses); 
router.get('/getbyid/:courseId', protect, getCourseByID); 
router.delete('/delete/:id', protect, admin, deleteCourse);
router.get('/instructor', protect, getCourseByInstructor);
router.post('/edit/:id', protect, adminOrInstructor , editCourse);

module.exports = router;