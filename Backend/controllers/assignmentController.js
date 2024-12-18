const Assignment = require('../models/Assignment');
const multer = require('multer');
const mongoose = require('mongoose');
const Course = require('../models/Course');
const path = require('path');

exports.createAssignment = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const courseId = req.params.courseId;

  if (!title || !description || !dueDate || !courseId) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  
  try {
    const assignment = new Assignment({
      title,
      description,
      dueDate,
      course: courseId,
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating assignment' });
  }
};

exports.getAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }
    try {
      const assignments = await Assignment.find({ course: courseId });
      res.status(200).json(assignments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching assignments' });
    }
  };

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads', 'assignments'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage });

exports.submitAssignment = [
  upload.single('assignmentFile'),
  async (req, res) => {
    const { courseId, assignmentId } = req.body;
    const studentId = req.user.userId;

    try {
      if (!studentId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
      }
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const course = await Course.findOne({ _id: courseId });
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      const alreadySubmitted = assignment.submissions.find(
        (submission) => submission.student === studentId
      );
      if (alreadySubmitted) {
        return res.status(400).json({ message: 'The user has already submitted an assignment' });
      }
      const currentDate = new Date();
      if (new Date(assignment.dueDate) < currentDate) {
        return res.status(400).json({ message: 'Cannot submit assignment past its due date' });
      }

      const submission = {
        student: studentId,
        submissionDate: currentDate,
        fileUrl: `/uploads/assignments/${req.file.filename}`,
        fileType: req.file.mimetype,
      };

      assignment.submissions.push(submission);
      await assignment.save();

      res.status(200).json({ message: 'Assignment submitted successfully', submission });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error submitting assignment' });
    }
  },
];

exports.getSubmissionsForAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await Assignment.findById(assignmentId)
      .populate('course', 'title instructor')
      .populate('submissions.student', 'name email');

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    if (assignment.course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to view submissions for this assignment' });
    }

    const formattedSubmissions = assignment.submissions.map(submission => ({
      studentName: submission.student.name,
      fileUrl: submission.fileUrl,
      submissionDate: submission.submissionDate,
      submissiongrade: submission.grade,
      studentId: submission.student.id
    }));

    res.status(200).json({
      submissions: formattedSubmissions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};