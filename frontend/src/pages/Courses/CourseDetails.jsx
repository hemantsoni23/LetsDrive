import React, { useEffect, useState } from "react";
import axios from "axios";
import course_banner from "../../assets/course_banner.webp";
import CourseModal from "./CourseModal";

const CourseDetails = ({ courses, setCourses }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/courses/list`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [setCourses]);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg my-8">
      <h2 className="text-4xl font-semibold mb-6 text-gray-800">Our Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={course_banner}
                  alt={course.course_name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{course.course_name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                </div>
                <button
                  onClick={() => handleEnrollClick(course)}
                  className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
};

export default CourseDetails;
