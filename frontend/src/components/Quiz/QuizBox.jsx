import React, { useState } from 'react';

const QuizBox = ({ question, options, next, prev, current, length, submit }) => {
  const [selected, setSelected] = useState(null);

  const handleSelection = (option) => {
    setSelected(option);
  };

  return (
    <div className="w-3/4 h-full bg-white p-6 shadow-lg flex flex-col items-center overflow-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">{question}</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((option, index) => (
          <div
            key={index}
            className={`w-full p-4 rounded-lg cursor-pointer text-lg text-center transition-transform border ${
              selected === option
                ? 'bg-green-100 border-green-500'
                : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
            }`}
            onClick={() => handleSelection(option)}
          >
            {String.fromCharCode(65 + index) + '. ' + option}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        {current > 0 && (
          <button
            className="px-6 py-2 text-lg font-medium bg-blue-600 text-white rounded-lg shadow-md transition duration-300 hover:bg-blue-700"
            onClick={prev}
          >
            Previous
          </button>
        )}
        {current < length - 1 ? (
          <button
            className="px-6 py-2 text-lg font-medium bg-blue-600 text-white rounded-lg shadow-md transition duration-300 hover:bg-blue-700"
            onClick={() => next(selected)}
          >
            Next
          </button>
        ) : (
          <button
            className="px-6 py-2 text-lg font-medium bg-green-600 text-white rounded-lg shadow-md transition duration-300 hover:bg-green-700"
            onClick={submit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizBox;
