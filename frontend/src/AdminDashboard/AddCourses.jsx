import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [newCourse, setNewCourse] = useState({
    course_name: '',
    description: '',
    practical_session: '',
    simulation_session: '',
    theory_session: '',
    type: '',
    price: '',
  });

  const handleAddCourse = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_ROUTE}/courses/add`, newCourse);
      // Redirect or update state after adding course
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Add New Course</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.course_name}
          onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Practical Sessions"
          value={newCourse.practical_session}
          onChange={(e) => setNewCourse({ ...newCourse, practical_session: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Simulation Sessions"
          value={newCourse.simulation_session}
          onChange={(e) => setNewCourse({ ...newCourse, simulation_session: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Theory Sessions"
          value={newCourse.theory_session}
          onChange={(e) => setNewCourse({ ...newCourse, theory_session: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Type"
          value={newCourse.type}
          onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Price"
          value={newCourse.price}
          onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button type="button" onClick={handleAddCourse} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
