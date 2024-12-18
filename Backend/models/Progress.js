const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const progressSchema = new mongoose.Schema({
  student: {
    type: String,
    ref: 'User',
    required: true,
  },
  course: {
    type: String,
    ref: 'Course', 
    required: true,
  },
  completedAssignments: [{
    type: String,
    ref: 'Assignment',
  }],
  grade: {
    type: Number,
    default: 0, 
  },
  status: {
    type: String,
    enum: ['not started','in progress', 'completed'],
    default: 'not started',
  },
  completionDate: {
    type: Date,
  }
}, { timestamps: true });

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;