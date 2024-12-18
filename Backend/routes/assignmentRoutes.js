const express = require('express');
const router = express.Router();
const { protect, adminOrInstructor} = require('../middlewares/authMiddleware');
const {createAssignment,getAssignmentsForCourse,submitAssignment,getSubmissionsForAssignment} = require('../controllers/assignmentController');

router.post('/create/:courseId', protect, adminOrInstructor ,createAssignment);
router.get('/get/:courseId', protect, getAssignmentsForCourse);
router.post('/submit/:assignmentId', protect, submitAssignment);
router.get('/getSubmissions/:assignmentId', protect, adminOrInstructor, getSubmissionsForAssignment);

module.exports = router;