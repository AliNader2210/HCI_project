const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  course: {
    type: String,
    ref: 'Course',
    required: true,
  },
  submissions: [
    {
      student: {
        type: String,
        ref: 'User',
        required: true,
      },
      submissionDate: {
        type: Date,
        default: Date.now,
      },
      fileUrl: {
        type: String,
        default: null,
      },
      grade: {
        type: Number,
        default: null,
      }
    },
  ],
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);
module.exports = Assignment;