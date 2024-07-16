import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/users/all-profiles`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleActivate = async (userId) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_ROUTE}/users/reverse-status/${userId}`);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'active' } : user
      ));
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_ROUTE}/users/reverse-status/${userId}`);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'inactive' } : user
      ));
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const handleAssignRole = async (userId, role) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_ROUTE}/users/assign-role/${userId}`, { role });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role } : user
      ));
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">User ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Status</th>
              <th className="py-2 px-4 border-b border-gray-200">Role</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b border-gray-200">{user.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.first_name} {user.last_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.status}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.status === 'inactive' && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => handleActivate(user.id)}
                    >
                      Activate
                    </button>
                  )}
                  {user.status === 'active' && (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDeactivate(user.id)}
                    >
                      Deactivate
                    </button>
                  )}
                  <select
                    value={user.role}
                    onChange={(e) => handleAssignRole(user.id, e.target.value)}
                    className="ml-4 p-1 border border-gray-300 rounded"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
