const express = require('express');
const router = express.Router();
const { addCourse, updateCourse, deleteCourse, listCourses } = require('../controllers/coursesControllers');
const authUser = require('../middlewares/authUser');

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. You are not authorized to access this resource.' });
    }
    next();
}

// Add a new course
router.post('/add', authUser, isAdmin, addCourse);

// Update a course
router.put('/update/:id', authUser, isAdmin, updateCourse);

// Delete a course
router.delete('/delete/:id', authUser, isAdmin, deleteCourse);

// Get all courses
router.get('/list', listCourses);

module.exports = router;

