import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CourseModal = ({ isOpen, onClose, course }) => {
  const { authToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setLoading(false);
      setPaymentError("");
    }
  }, [isOpen]);

  const initializePayment = async (orderId, userDetails) => {
    const { first_name, last_name, email, phone_number } = userDetails;
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: course.price * 100,
      currency: "INR",
      name: "Course Enrollment",
      description: `Enroll for ${course.course_name}`,
      order_id: orderId,
      handler: async (response) => {
        try {
            const status = response.razorpay_payment_id && response.razorpay_signature ? 'success' : 'failure';
            const failure_reason = status === 'failure' ? response?.error?.description || 'Payment failed for an unknown reason.' : null;

          // Update payment details in the backend
          await axios.put(
            `${process.env.REACT_APP_API_ROUTE}/payment/${orderId}`,
            {
                status,
                razorpay_signature: response.razorpay_signature,
                payment_id: response.razorpay_payment_id,
                description: `Enroll for ${course.course_name}`,
                failure_reason,
            },
            { withCredentials: true }
          );

          if (status === "success") {
            // try {
            //   await axios.post(`${process.env.REACT_APP_API_ROUTE}/userCourse/`, {
            //     course_name: course.course_name,
            //     payment_id: response.razorpay_payment_id,
            //   }, {withCredentials: true});
            // }catch (error) {
            //   console.error("Error updating user course details:", error); 
            // }
            toast.success("Enrollment successful!");
            onClose();
          } else {
            toast.error("Payment failed. Please try again.");
          }
        } catch (error) {
          console.error("Error updating payment details:", error);
          toast.error("An error occurred while processing payment.");
        }
      },
      prefill: {
        name: `${first_name} ${last_name}`,
        email,
        contact: phone_number,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: () => setPaymentError("Payment was not completed. Please try again."),
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const paymentResponse = await axios.post(
        `${process.env.REACT_APP_API_ROUTE}/payment/`,
        {
          amount: course.price * 100,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          course_id: course.id,
        },
        { withCredentials: true }
      );

      const userResponse = await axios.get(
        `${process.env.REACT_APP_API_ROUTE}/users/profile`,
        { withCredentials: true }
      );

      initializePayment(paymentResponse.data.order_id, userResponse.data);
    } catch (error) {
      console.error("Payment Initialization Error:", error);
      setPaymentError("Unable to process payment. Please try again.");
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
      <div className="absolute bg-white p-6 rounded-lg shadow-lg w-4/5 h-3/5 z-100">
        {authToken ? (
          <>
            <h2 className="text-xl font-bold mb-4">Enroll in {course.course_name}</h2>
            <p className="mb-4 text-gray-600">{course.description}</p>
            <p className="text-lg font-semibold">Price: ₹{course.price}</p>
            <button
              onClick={handlePayment}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 w-full hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Pay"}
            </button>
            {paymentError && <p className="text-red-500 mt-2">{paymentError}</p>}
          </>
        ) : (
          <p className="text-center text-gray-700">
            Please log in to enroll in this course.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseModal;
