// EditDetailsModal.jsx
import React from 'react';

const EditDetailsModal = ({ isOpen, toggle }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input type="text" id="name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Phone</label>
            <input type="text" id="phone" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-500 text-white rounded-md px-4 py-2 mr-2" onClick={toggle}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDetailsModal;
