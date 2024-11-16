import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LearnerLicenseApplicants = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/applicants/list`);
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, []);

  const manageLicenseApproval = async (applicantId,action) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_ROUTE}/license/approve/${applicantId}`,{action});
      if (action) {
        setApplicants(applicants.map(applicant => 
        applicant.id === applicantId ? { ...applicant, status: 'Approved' } : applicant
      ));
      } else {
        setApplicants(applicants.filter(applicant => applicant.id !== applicantId));
      }
    } catch (error) {
      console.error('Error approving applicant:', error);
    }
  };

  const isEligibleForPermanent = (updatedAt) => {
    try {
      let present_date = new Date();

      let difference = present_date.getTime() - updatedAt.getTime();

      let days = difference / (1000 * 3600 * 24);

      return (days >= 30);
    }catch (error) {
      console.error('Error checking eligibility:', error);
    }
  };

  const handleSendReminder = async (applicantId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_ROUTE}/applicants/remind/${applicantId}`);
      alert('Reminder sent successfully!');
    } catch (error) {
      console.error('Error sending reminder:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Learner License Applicants</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Applicant ID</th>
              <th className="py-2 px-4 border-b border-gray-200">User Id</th>
              <th className="py-2 px-4 border-b border-gray-200">Test result</th>
              <th className="py-2 px-4 border-b border-gray-200">Type</th>
              <th className="py-2 px-4 border-b border-gray-200">Status</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map(applicant => (
              <tr key={applicant.id}>
                <td className="py-2 px-4 border-b border-gray-200">{applicant.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{applicant.userId}</td>
                <td className="py-2 px-4 border-b border-gray-200">{applicant.test_result}</td>
                <td className="py-2 px-4 border-b border-gray-200">{applicant.type}</td>
                <td className="py-2 px-4 border-b border-gray-200">{applicant.license_approved}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {applicant.license_approved === null && (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                        onClick={() => manageLicenseApproval(applicant.id,true)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => manageLicenseApproval(applicant.id,false)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {isEligibleForPermanent(applicant.updatedAt) && applicant.license_approved && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleSendReminder(applicant.id)}
                    >
                      Send Reminder
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LearnerLicenseApplicants;
