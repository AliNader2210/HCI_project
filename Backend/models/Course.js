const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  instructor: {
    type: String,
    ref: 'User',
    required: true,
  },
  materials: [
    {
      materialtitle: {
        type : String,
        required: true,
      },
      fileUrl: {
        type: String,
        required: true,
      },
      type:{
        type: String ,
        required: true,
        enum: ['lecture', 'video'],
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;