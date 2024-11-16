import React from 'react';

const SideBarQuiz = ({ Questions, answers, handleMove }) => {
  return (
    <div className="w-1/4 h-full bg-teal-100 p-4 shadow-lg overflow-y-auto">
      <h2 className="text-center text-lg font-semibold mb-4 text-gray-700">Questions</h2>
      <div className="flex flex-wrap gap-2">
        {Questions.map((_, index) => (
          <div
            key={index}
            className={`w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer border-2 font-medium transition-colors ${
              answers[index] ? 'bg-teal-400 text-white' : 'bg-white text-gray-600 border-gray-300'
            } hover:bg-teal-200`}
            onClick={() => handleMove(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarQuiz;
