const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Assignment = require('./models/Assignment');
const Progress = require('./models/Progress');

mongoose.connect('mongodb://localhost:27017/lms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedDatabase = async () => {
  try {
    await User.deleteMany();
    await Course.deleteMany();
    await Assignment.deleteMany();
    await Progress.deleteMany();

    const users = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: '$2b$10$8/QE74apfWKWjP4sWhKjvOXoGn8gBjv7eO8TGXL2p7AQgbJpk4VLq',
        role: 'student',
        telephone: 1234567890,
        gender: 'female',
        active: true,
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: '$2b$10$8/QE74apfWKWjP4sWhKjvOXoGn8gBjv7eO8TGXL2p7AQgbJpk4VLq',
        role: 'instructor',
        telephone: 9876543210,
        gender: 'male',
        active: true,
      },
      {
        name: 'Charlie Admin',
        email: 'charlie@example.com',
        password: '$2b$10$8/QE74apfWKWjP4sWhKjvOXoGn8gBjv7eO8TGXL2p7AQgbJpk4VLq',
        role: 'admin',
        telephone: 1122334455,
        gender: 'male',
        active: true,
      },
    ]);

    const courses = await Course.insertMany([
      {
        title: 'Introduction to JavaScript',
        description: 'Learn the basics of JavaScript programming.',
        instructor: users[1].id,
        materials: [
          { materialtitle: 'JavaScript Basics', fileUrl: 'https://example.com/js-basics.pdf', type: 'lecture' },
          { materialtitle: 'Introduction Video', fileUrl: 'https://example.com/intro-video.mp4', type: 'video' },
        ],
      },
      {
        title: 'Advanced Node.js',
        description: 'Dive deep into Node.js development.',
        instructor: users[1].id, 
        materials: [
          { materialtitle: 'Node.js Streams', fileUrl: 'https://example.com/node-streams.pdf', type: 'lecture' },
        ],
      },
    ]);

    const assignments = await Assignment.insertMany([
      {
        title: 'JavaScript Basics Assignment',
        description: 'Complete the exercises on JavaScript basics.',
        dueDate: new Date('2024-12-31'),
        course: courses[0].id,
        submissions: [
          { student: users[0].id, fileUrl: 'https://example.com/alice-js-assignment.pdf', grade: 85 },
        ],
      },
      {
        title: 'Node.js Project',
        description: 'Build a Node.js application.',
        dueDate: new Date('2025-01-15'),
        course: courses[1].id, 
      },
    ]);

    const progress = await Progress.insertMany([
      {
        student: users[0].id, 
        course: courses[0].id, 
        completedAssignments: [assignments[0].id], 
        grade: 85,
        status: 'completed',
        completionDate: new Date('2024-12-15'),
      },
      {
        student: users[0].id,
        course: courses[1].id, 
        status: 'in progress',
      },
    ]);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDatabase();