import React from 'react';

const Modal = ({ isOpen, onClose, course }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-auto flex justify-center items-center z-50">
      <div onClick={onClose} className=" w-full h-full inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute bg-white p-6 rounded-lg shadow-lg w-4/5 h-3/5 z-100">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{course.course_name}</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:text-red-600"
          >
            &times;
          </button>
        </div>
        <p className="mt-4 text-gray-600">{course.description}</p>
        <div className="mt-4">
          <p className="text-gray-700 font-semibold">
            Practical Sessions:{' '}
            <span className="font-normal">{course.practical_session}</span>
          </p>
          <p className="text-gray-700 font-semibold">
            Simulation Sessions:{' '}
            <span className="font-normal">{course.simulation_session}</span>
          </p>
          <p className="text-gray-700 font-semibold">
            Theory Sessions:{' '}
            <span className="font-normal">{course.theory_session}</span>
          </p>
          <p className="text-gray-700 font-semibold">
            Price: <span className="font-normal">${course.price}</span>
          </p>
          <p className="text-gray-700 font-semibold">
            Type: <span className="font-normal">{course.type}</span>
          </p>
        </div>
        <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
