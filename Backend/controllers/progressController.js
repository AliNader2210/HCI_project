const Progress = require('../models/Progress');
const Course = require('../models/Course');
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const mongoose = require('mongoose');
exports.getAllStudentProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ student: req.user.userId })
      .populate('course', 'title') 
      .populate('student', 'name email');
    if (!progress || progress.length === 0) {
      return res.status(404).json({ message: 'No progress found for this student' });
    }

    const progressDetails = progress.map(p => ({
      courseId: p.course._id,
      courseTitle: p.course.title,
      grade: p.grade,
      status: p.status,
    }));

    res.status(200).json(progressDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCourseProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      student: req.user.id,
      course: req.params.courseId,
    }).populate('course', 'title')
      .populate('student', 'name email');

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found for this course' });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getStudentsProgressForCourse = async (req, res) => {
  try {
    const progress = await Progress.find({ course: req.params.courseId })
      .populate('student', 'name email')
      .populate('course', 'title');

    if (!progress) {
      return res.status(404).json({ message: 'No progress found for this course' });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({ 
      student: req.user.id,
      course: req.params.courseId 
    });

    if (!progress) {
      progress = new Progress({
        student: req.user.id,
        course: req.params.courseId,
        status: 'in progress',
      });
    }

    progress.completedAssignments.push(req.body.assignmentId);
    progress.grade = req.body.grade || progress.grade;

    if (progress.completedAssignments.length === req.body.totalAssignments) {
      progress.status = 'completed';
      progress.completionDate = new Date();
    }

    await progress.save();
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.gradeAssignment = async (req, res) => {
  const {assignmentId, studentId} = req.params;
  const {submission} = req.body;

  if (!assignmentId || !studentId  === undefined) {
    return res.status(400).json({ message: 'Please provide assignmentId, studentId, and grade' });
  }
  
  if (submission === undefined) {
    return res.status(400).json({ message: 'Please provide submission' });
  }
  
  try {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const studentsubmission = assignment.submissions.find(
      sub => sub.student.toString() === studentId
    );

    if (!studentsubmission) {
      return res.status(404).json({ message: 'Submission not found for this student' });
    }

    studentsubmission.grade = submission;
    await assignment.save();

    let progress = await Progress.findOne({
      student: studentId,
      course: assignment.course,
    });

    if (!progress) {
      progress = new Progress({
        student: studentId,
        course: assignment.course,
        completedAssignments: [],
      });
    }

    if (!progress.completedAssignments.includes(assignmentId)) {
      progress.completedAssignments.push(assignmentId);
    }

    const completedAssignments = await Assignment.find({
      _id: { $in: progress.completedAssignments },
    });

    const totalGrade = completedAssignments.reduce((sum, assign) => {
      const studentSubmission = assign.submissions.find(
        sub => sub.student.toString() === studentId
      );
      return sum + (studentSubmission?.grade || 0);
    }, 0);

    const averageGrade = totalGrade / completedAssignments.length;

    progress.grade = averageGrade;
    progress.status =
      progress.completedAssignments.length ===
      (await Assignment.countDocuments({ course: assignment.course }))
        ? 'completed'
        : 'in progress';

    await progress.save();

    res.status(200).json({
      message: 'Assignment graded and progress updated successfully',
      progress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.assignStudentToCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found or invalid role' });
    }

    const existingProgress = await Progress.findOne({ student: studentId, course: courseId });
    if (existingProgress) {
      return res.status(400).json({ message: 'Student is already assigned to this course' });
    }

    const progress = new Progress({
      student: studentId,
      course: courseId,
      status: 'in progress',
    });

    await progress.save();

    res.status(201).json({ message: 'Student successfully assigned to course', progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};