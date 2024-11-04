// MockQuizModal.jsx
import React, { useState } from 'react';

const MockQuizModal = ({ isOpen, onClose, courses }) => {
  const [licenseType, setLicenseType] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [experience, setExperience] = useState('');
  const [hasLicense, setHasLicense] = useState('');
  
  if (!isOpen) return null;

  const handleQuizSubmit = () => {
    // Logic to recommend a course based on the quiz results
    const filteredCourses = courses.filter(course => 
      course.type === licenseType || licenseType === 'Both'
    );

    if (filteredCourses.length === 0) {
      alert('No courses available for the selected license type.');
      return;
    }

    // Further filtering and recommending logic
    // Assuming we sort by price here for simplicity
    const recommendedCourse = filteredCourses.sort((a, b) => a.price - b.price)[0];

    if (recommendedCourse) {
      alert(`We recommend the following course for you: ${recommendedCourse.course_name}`);
    } else {
      alert('No suitable course found based on your inputs.');
    }
    
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 overflow-auto flex justify-center items-center'>
      <div onClick={onClose} className=' h-full w-full bg-black bg-opacity-50'></div>
      <div className="absolute bg-white w-4/5 h-4/5 p-8">
        <h2 className="text-3xl font-bold mb-4">Mock Quiz</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>
        <div className="mb-4">
          <label className="block mb-2">Which license type are you interested in?</label>
          <select 
            className="w-full p-2 border rounded" 
            value={licenseType} 
            onChange={(e) => setLicenseType(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Two Wheeler">Two Wheeler</option>
            <option value="Four Wheeler">Four Wheeler</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">What is your age group?</label>
          <select 
            className="w-full p-2 border rounded" 
            value={ageGroup} 
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="18-24">18-24</option>
            <option value="25-34">25-34</option>
            <option value="35+">35+</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Rate your driving experience</label>
          <select 
            className="w-full p-2 border rounded" 
            value={experience} 
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Do you have a license?</label>
          <select 
            className="w-full p-2 border rounded" 
            value={hasLicense} 
            onChange={(e) => setHasLicense(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded" 
          onClick={handleQuizSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MockQuizModal;
