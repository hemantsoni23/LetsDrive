import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnquiriesManagement = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/enquiries`);
        setEnquiries(response.data);
      } catch (error) {
        console.error('Error fetching enquiries:', error);
      }
    };

    fetchEnquiries();
  }, []);

  const handleResolve = async (enquiryId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_ROUTE}/enquiries/resolve/${enquiryId}`);
      setEnquiries(enquiries.map(enquiry =>
        enquiry.id === enquiryId ? { ...enquiry, status: 'Resolved' } : enquiry
      ));
    } catch (error) {
      console.error('Error resolving enquiry:', error);
    }
  };

  const handleDelete = async (enquiryId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_ROUTE}/enquiries/${enquiryId}`);
      setEnquiries(enquiries.filter(enquiry => enquiry.id !== enquiryId));
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Enquiries Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Enquiry ID</th>
              <th className="py-2 px-4 border-b border-gray-200">User Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Message</th>
              <th className="py-2 px-4 border-b border-gray-200">Status</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enquiry => (
              <tr key={enquiry.id}>
                <td className="py-2 px-4 border-b border-gray-200">{enquiry.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{enquiry.userName}</td>
                <td className="py-2 px-4 border-b border-gray-200">{enquiry.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{enquiry.message}</td>
                <td className="py-2 px-4 border-b border-gray-200">{enquiry.status}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {enquiry.status !== 'Resolved' && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => handleResolve(enquiry.id)}
                    >
                      Resolve
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(enquiry.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiriesManagement;
