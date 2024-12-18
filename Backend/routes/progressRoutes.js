const express = require('express');
const { protect, adminOrInstructor,admin} = require('../middlewares/authMiddleware');
const { getCourseProgress,
     getStudentsProgressForCourse,
      updateProgress,getAllStudentProgress,
       gradeAssignment,
       assignStudentToCourse} = require('../controllers/progressController');

const router = express.Router();

router.get('/', protect, getCourseProgress);
router.get('/allstudents/:courseId', protect, adminOrInstructor, getStudentsProgressForCourse);
router.put('/update', protect, updateProgress);
router.get('/allprogress', protect, getAllStudentProgress);
router.put('/gradeAssignment/:assignmentId/:studentId', protect,adminOrInstructor, gradeAssignment);
router.put('/Assigntocourse', protect,admin, assignStudentToCourse);
module.exports = router;