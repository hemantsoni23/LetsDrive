const UserCourse = require('../models/UserCourse');
const User = require('../models/User');
const Course = require('../models/Course');

const createUserCourse = async (req, res) => {
    const { course_name, payment_id } = req.body;

    if (!course_name || !payment_id) {
        return res.status(400).json({ error: 'Course ID and User ID are required.' });
    }

    try {
        const userCourse = await UserCourse.create({
            courseName:course_name,
            userEmail:req.user.email,
            paymentId:payment_id,
        });

        res.status(201).json(userCourse);
    } catch (error) {
        console.error('Create User Course Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUserCourse = async (req, res) => {
    try {
        const { email } = req.user; 

        const userCourses = await UserCourse.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'email'], 
                    where: { email }, 
                },
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'course_name', 'description', 'price', 'type'],
                },
            ],
        });

        res.status(200).json(userCourses);
    } catch (error) {
        console.error('Get User Course Error:', error);
        res.status(500).json({ error: 'Failed to fetch user courses' });
    }
};

module.exports = {
    createUserCourse,
    getUserCourse,
}