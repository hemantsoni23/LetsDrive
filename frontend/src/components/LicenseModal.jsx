import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

const LicenseModal = ({ isOpen, onClose }) => {
  const { authToken } = useSelector((state) => state.auth);
  const [customization, setCustomization] = useState({
    learnerType: '',
    extraFeatures: [],
  });
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [alreadyApplied,setAlreadyApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setCustomization({ learnerType: '', extraFeatures: [] });
      setAmount(0);
      setLoading(false);
      setPaymentError('');
    }

    const checkUser = async () => {
      try {
        const { data: userPayments } = await axios.get(`${process.env.REACT_APP_API_ROUTE}/payment/`, {
            withCredentials: true,
        });

        const alreadyApplied = userPayments.some(
            (payment) => payment.status === 'success' && payment.description === 'Learner License Application'
        );
        setAlreadyApplied(alreadyApplied);
      }catch(err){
        console.error('User Check Error:', err);
      }
     }
    
    checkUser();
  }, [isOpen]);


  const handleCustomizationChange = (field, value) => {
    setCustomization((prev) => {
      const updated = { ...prev, [field]: value };
      calculateAmount(updated);
      return updated;
    });
  };

  const calculateAmount = ({ learnerType, extraFeatures }) => {
    let baseAmount = 0;
    if (learnerType === 'bike' || learnerType === 'car') baseAmount = 50;
    if (learnerType === 'both') baseAmount = 100;
    if (extraFeatures.includes('fastProcessing')) baseAmount += 200;
    setAmount(baseAmount);
  };

  const initializePayment = async (orderId, userDetails) => {
    const { first_name, last_name, email, phone_number } = userDetails;
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      name: 'Learner License Application',
      description: 'Customization and Payment for Learner License',
      order_id: orderId,
      handler: async (response) => {

          try {
              const status = response.razorpay_payment_id && response.razorpay_signature ? 'success' : 'failure';
              const failure_reason = status === 'failure' ? response?.error?.description || 'Payment failed for an unknown reason.' : null;

              await axios.put(
                  `${process.env.REACT_APP_API_ROUTE}/payment/${orderId}`,
                  {
                      status,
                      razorpay_signature: response.razorpay_signature,
                      payment_id: response.razorpay_payment_id,
                      description: 'Learner License Application',
                      failure_reason,
                  },
                  { withCredentials: true }
              );

              if (status === "success") {
                toast.success("Learner License application successful! Please checkout our driving courses!");
                navigate("/learnToDrive");
              } else {
                toast.error(`Payment failed: ${failure_reason}`);
              }
          } catch (error) {
              console.error('Error updating payment details:', error);
          }
      },

      prefill: {
        name: `${first_name} ${last_name}`,
        email,
        contact: phone_number,
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: () => { setPaymentError('Payment was not completed. Please try again.'); toast.warning("Payment was not completed. Please try again.")},
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handlePayment = async () => {
    setLoading(true);
    setPaymentError('');
    try {
      const paymentResponse = await axios.post(
        `${process.env.REACT_APP_API_ROUTE}/payment/`,
        { amount: amount * 100, currency: 'INR', receipt: `receipt_${Date.now()}`, customization },
        { withCredentials: true }
      );

      const userResponse = await axios.get(`${process.env.REACT_APP_API_ROUTE}/users/profile`, {
        withCredentials: true,
      });

      initializePayment(paymentResponse.data.order_id, userResponse.data);
    } catch (error) {
      console.error('Payment Initialization Error:', error);
      setPaymentError('Unable to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-auto flex justify-center items-center z-50">
      <div
        onClick={onClose}
        className="w-full h-full bg-black bg-opacity-50"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bg-white p-6 rounded-lg shadow-lg w-4/5 h-3/5 z-100"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {authToken ?
          (!alreadyApplied ? (
          <>
            <div className="flex justify-between items-center">
              <h2 id="modal-title" className="text-2xl font-bold">
                Customize Your Learner License
              </h2>
              <button
                onClick={onClose}
                className="text-xl font-bold hover:text-red-600"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="my-4">
              <label className="block mb-2 text-lg font-semibold">License Type:</label>
              <select
                className="w-full p-2 border rounded"
                value={customization.learnerType}
                onChange={(e) => handleCustomizationChange('learnerType', e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="both">Car & Bike</option>
              </select>
            </div>

            <div className="my-4">
              <label className="block mb-2 text-lg font-semibold">Additional Features:</label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={customization.extraFeatures.includes('fastProcessing')}
                  onChange={(e) =>
                    handleCustomizationChange(
                      'extraFeatures',
                      e.target.checked
                        ? [...customization.extraFeatures, 'fastProcessing']
                        : customization.extraFeatures.filter((f) => f !== 'fastProcessing')
                    )
                  }
                />
                Fast Processing (+₹200)
              </label>
            </div>

            <p className="text-lg font-bold my-4">Total Amount: ₹{amount}</p>

            <button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>

            {paymentError && <p className="text-red-600 mt-4">{paymentError}</p>}
          </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-semibold text-gray-800">
                You have already applied for Learners License check the status from User Progress.
              </h2>
            </div>
        ) ): (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl font-semibold text-gray-800">
              Please login/register to continue.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default LicenseModal;
