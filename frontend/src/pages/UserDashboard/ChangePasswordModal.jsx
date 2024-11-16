import React from 'react';

const ChangePasswordModal = ({ isOpen, toggle }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="current-password" className="block text-gray-700">Current Password</label>
            <input type="password" id="current-password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-gray-700">New Password</label>
            <input type="password" id="new-password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
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

export default ChangePasswordModal;
