import React from 'react';

const Expectations = () => {
  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-3xl font-semibold mb-4">What to Expect from Our Courses</h2>
      <p className="text-gray-700 text-lg mb-4">
        Our courses are designed to provide comprehensive training to help you become a skilled driver. You can expect:
      </p>
      <ul className="list-disc pl-8 text-gray-700">
        <li>Professional instructors with extensive experience.</li>
        <li>Flexible timings to fit your schedule.</li>
        <li>Both practical and theoretical sessions.</li>
        <li>Modern vehicles and simulators for practice.</li>
        <li>Mock tests to prepare you for the actual driving test.</li>
      </ul>
    </div>
  );
};

export default Expectations;
