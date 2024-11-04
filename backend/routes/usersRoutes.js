const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const authUser = require('../middlewares/authUser');

// User registration route
router.post('/register', userControllers.register);

// User login route
router.post('/login', userControllers.login);

// User profile route
router.get('/profile', authUser, userControllers.profile);

// Update user profile route
router.put('/update-profile', authUser, userControllers.updateProfile);

// Reset password route
router.post('/reset-password', authUser, userControllers.resetPassword);

// Get all user profile
router.get('/all-profiles', userControllers.getAllUsers);

//Update user status
router.put('/reverse-status/:id', userControllers.updateStatus);

//Check user == admin or not
router.get('/check-admin', authUser, userControllers.checkAdmin);

module.exports = router;