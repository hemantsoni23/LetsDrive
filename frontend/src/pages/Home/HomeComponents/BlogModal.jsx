import React from 'react';

const BlogModal = ({ isOpen, onClose, blog }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center">
      <div onClick={onClose} className='absolute h-full w-full bg-black bg-opacity-50'></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-4/5 h-2/5 z-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
        <p className="text-gray-700">{blog.description}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BlogModal;
