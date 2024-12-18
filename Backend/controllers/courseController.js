const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Progress = require('../models/Progress');

exports.addCourses = async (req, res) => {
  const { title} = req.body;
  try {
      const NewCourse = new Course({ title, instructor: req.user.userId});
      await NewCourse.save();
      res.status(201).json(NewCourse);
  }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};
exports.adminaddCourses = async (req, res) => {
  const {title,instructorId} = req.body;
  try {
      const NewCourse = new Course({ title, instructor: instructorId});
      await NewCourse.save();
      res.status(201).json(NewCourse);
  }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};
exports.editCourse = async (req, res) => {
  const { description, materialstype, materialsurl, materialtitle } = req.body;
  const id = req.params.id;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if (course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }
    if (description) {
      course.description = description;
    }
    if (materialstype && materialsurl) {
      course.materials.push({
        materialtitle:materialtitle,
        type: materialstype,
        fileUrl: materialsurl,
      });
    }
    const updatedCourse = await course.save();
    res.status(200).json({ message: 'Course updated successfully', updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCourseByID = async (req, res) => {
    const {courseId} = req.params;
    try {
        const course = await Course.findById(courseId).populate('instructor','name email');
        if(!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getCourses = async (req, res) => {
    try {
      const courses = await Course.find().populate('instructor', 'name email');
      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
  
    try {
      const course = await Course.findById(id);
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to delete this course' });
      }
      await Assignment.deleteMany({ course: id });
      await Progress.deleteMany({ course: id });
      await Course.findByIdAndDelete(id);
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  exports.getCourseByInstructor = async (req, res) => {
    try {
        const instructorid = req.user.userId;
        const courses = await Course.find({instructor: instructorid});
        if (!courses || courses.length === 0) {
          return res.status(404).json({ message: 'No courses found for this instructor' });
        }
        res.status(200).json({ message: 'Courses fetched successfully', courses });
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
      }
  }