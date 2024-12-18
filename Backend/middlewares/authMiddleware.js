const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
exports.adminOrInstructor = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'instructor') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins or instructors only' });
  }
};
exports.admin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins' });
  }
}