const User = require('../models/User');
const Progress = require('../models/Progress');

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, role, gender, telephone} = req.body;
  
  if (req.user.role !== 'admin' && req.user.id !== userId) {
    return res.status(403).json({ message: 'Not authorized to update this user' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
        
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.gender = gender || user.gender;
    user.telephone = telephone || user.telephone;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to delete this user' });
  }
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Progress.deleteMany( {student : userId})
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to view all users' });
  }    
  try {
    const users = await User.find({ role: { $ne: 'admin' } }); 
    res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};
exports.activateUser = async (req, res) => {
  const { userId } = req.params;
  try{
    const user = await User.findById(userId);
    if (!user){
      return res.status(404).json({ message: 'User not found' });
    }
    user.active = true;
    await user.save();
    res.status(200).json({ message: 'User activated successfully', user });
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Error activating user' });
  }
}
exports.getAllstudents = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to view all users' });
  }

  try {
    const students = await User.find({ role: 'student' });

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }
    res.status(200).json({ message: 'Students fetched successfully', students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching students' });
  }
};
exports.getAllinstructor = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to view all instructor' });
  }

  try {
    const instructors = await User.find({ role: 'instructor' });

    if (instructors.length === 0) {
      return res.status(404).json({ message: 'No instructors found' });
    }
    res.status(200).json({ message: 'instructors fetched successfully', instructors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching instructors' });
  }
};