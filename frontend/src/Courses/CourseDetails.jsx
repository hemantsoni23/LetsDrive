// CourseDetails.jsx
import React, { useEffect } from 'react';
import axios from 'axios';

const CourseDetails = ({ courses, setCourses }) => {
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/courses/list`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [setCourses]);

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-3xl font-semibold mb-4">Our Courses</h2>
      {courses.map((course) => (
        <div key={course.id} className="mb-8 flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <h3 className="text-2xl font-bold mb-2">{course.course_name}</h3>
            <p className="text-gray-700 mb-2">{course.description}</p>
            <ul className="list-disc pl-8 text-gray-700">
              <li>Practical Sessions: {course.practical_session}</li>
              <li>Simulation Sessions: {course.simulation_session}</li>
              <li>Theory Sessions: {course.theory_session}</li>
              <li>Price: ${course.price}</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <img src={course.image_url} alt={course.course_name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
              <li>Type: {course.type}</li>
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
