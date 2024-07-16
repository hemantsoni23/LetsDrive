import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_ROUTE}/courses/delete/${courseId}`);
      setCourses(courses.filter(course => course.id !== courseId));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Courses</h2>
        <Link to="/admin/add-course" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Course</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Course ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Course Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Description</th>
              <th className="py-2 px-4 border-b border-gray-200">Practical Sessions</th>
              <th className="py-2 px-4 border-b border-gray-200">Simulation Sessions</th>
              <th className="py-2 px-4 border-b border-gray-200">Theory Sessions</th>
              <th className="py-2 px-4 border-b border-gray-200">Type</th>
              <th className="py-2 px-4 border-b border-gray-200">Price</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td className="py-2 px-4 border-b border-gray-200">{course.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.course_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.description.split(' ').slice(0, 10).join(' ')}...</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.practical_session}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.simulation_session}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.theory_session}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.type}</td>
                <td className="py-2 px-4 border-b border-gray-200">${course.price}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => navigate(`/admin/edit-course/${course.id}`)}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => { setDeleteCourseId(course.id); setShowModal(true); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Do you want to delete this course?</h2>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => handleDeleteCourse(deleteCourseId)}>YES</button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal(false)}>NO</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
