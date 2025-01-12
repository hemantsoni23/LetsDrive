const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const { getUserCourse, createUserCourse } = require('../controllers/userCourseControllers');

router.post('/', authUser, createUserCourse);

router.get('/', authUser, getUserCourse);

module.exports = router;