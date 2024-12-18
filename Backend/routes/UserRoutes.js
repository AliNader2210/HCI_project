const express = require('express');
const { protect, admin} = require('../middlewares/authMiddleware');
const {updateUser, deleteUser, getAllUsers,activateUser,getAllstudents,getAllinstructor } = require('../controllers/UserController');

const router = express.Router();

router.put('/update', protect, updateUser);
router.delete('/delete/:userId', protect, admin, deleteUser);
router.get('/fetch', protect, admin, getAllUsers);
router.post('/activate/:userId', protect, admin, activateUser);
router.get('/getstudents', protect, admin, getAllstudents);
router.get('/getinstructors', protect, admin, getAllinstructor);

module.exports = router;