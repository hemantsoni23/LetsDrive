import React, { useState } from 'react';
import EditDetailsModal from './EditDetailsModal';
import ChangePasswordModal from './ChangePasswordModal';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false); 
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const dob = new Date(userDetails.dob).toLocaleDateString('en-GB');

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
  const toggleChangePasswordModal = () => setIsChangePasswordModalOpen(!isChangePasswordModalOpen);

  if (userDetails === null) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Email</label>
          <div className="flex items-center space-x-2">
            <span>{userEmail}</span>
            {!isEmailVerified && (
              <span className="text-red-500 cursor-pointer" onClick={() => setIsEmailVerified(true)}>
                Verify Email
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Name</label>
          <span>{userDetails.first_name + ' ' + userDetails.last_name}</span>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">Phone</label>
          <span>{userDetails.phone_number}</span>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold">DOB</label>
          <span>{dob}</span>
        </div>
        <div className="flex flex-wrap space-x-4 mt-4">
          <button onClick={toggleEditModal} className="bg-blue-500 text-white rounded-md px-4 py-2">Edit Details</button>
          <button onClick={toggleChangePasswordModal} className="bg-blue-500 text-white rounded-md px-4 py-2">Change Password</button>
          <button className="bg-red-500 text-white rounded-md px-4 py-2">Delete Account</button>
        </div>
      </div>

      {isEditModalOpen && <EditDetailsModal isOpen={isEditModalOpen} toggle={toggleEditModal} />}
      {isChangePasswordModalOpen && <ChangePasswordModal isOpen={isChangePasswordModalOpen} toggle={toggleChangePasswordModal} />}
    </div>
  );
};

export default Profile;
