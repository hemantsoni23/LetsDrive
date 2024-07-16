const Course = require('../models/course');

// Add a new course
const addCourse = async (req, res) => {
    try {
        console.log(req.body);
        // Get the course data from the request body
        const { course_name, description, price, simulation_session, practical_session, theory_session, type } = req.body;

        // Create a new course object
        const course = new Course({
            course_name,
            description,
            practical_session,
            simulation_session,
            theory_session,
            price,
            type,
        });

        // Save the course to the database
        const newCourse = await course.save();

        // Return the newly created course
        res.status(201).json(newCourse);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error });
    }
};

// Update an existing course
const updateCourse = async (req, res) => {
    try {
        // Get the course ID from the request parameters
        const { id } = req.params;

        // Get the updated course data from the request body
        const { course_name, description, price, simulation_session,practical_session,theory_session,type } = req.body;

        // Find the course by ID and update its data
        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { course_name, description, price, simulation_session, practical_session, theory_session, type },
            { new: true }
        );

        // Return the updated course
        res.json(updatedCourse);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to update course' });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    try {
        // Get the course ID from the request parameters
        const { id } = req.params;

        // Find the course by ID and delete it
        await Course.findByIdAndDelete(id);

        // Return a success message
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to delete course' });
    }
};

// Get a list of all courses
const listCourses = async (req, res) => {
    try {
        // Find all courses in the database
        const courses = await Course.findAll();

        // Return the list of courses
        res.json(courses);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error });
    }
};

module.exports = { addCourse, updateCourse, deleteCourse, listCourses };