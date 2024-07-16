// MockQuizFeature.jsx
import React from 'react';

const MockQuizFeature = ({ headings, paragraph, openModal }) => {
  return (
    <div className="container mx-auto mt-16">
      <h2 className="text-3xl font-bold mb-6 text-center">{headings}</h2>
      <p className="text-lg text-center mb-8">
        {paragraph}
      </p>
      <div className="flex justify-center">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={openModal}
        >
          Take a Short Quiz
        </button>
      </div>
    </div>
  );
};

export default MockQuizFeature;
