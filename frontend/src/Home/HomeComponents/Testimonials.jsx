// components/Testimonials.jsx
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    { name: "John Doe", feedback: "Great experience! I passed my driving test on the first try." },
      { name: "Jane Smith", feedback: "The instructors were very patient and knowledgeable." },
    // Add more testimonials as needed
  ];

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-8">What Our Students Say</h2>
      <div className="flex justify-around">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="max-w-xs bg-white p-4 rounded shadow-lg m-4">
            <p className="italic">"{testimonial.feedback}"</p>
            <p className="text-right mt-4">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
