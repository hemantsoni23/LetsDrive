// ContactUs.jsx
import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here (API or email integration)
    setSubmitted(true);
  };

  return (
    <section className="contact-us py-12 px-4 md:px-20 lg:px-40">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Have questions or need assistance? Fill out the form below, and our team will get back to you as soon as possible.
      </p>

      {submitted ? (
        <p className="text-center text-green-600">Thank you for reaching out! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      )}
    </section>
  );
};

export default ContactUs;
