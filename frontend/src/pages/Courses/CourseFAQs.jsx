import React, { useState } from 'react';

const CourseFAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { question: "What are the course timings?", answer: "We offer flexible timings to fit your busy schedule. You can check our website or contact us for more details." },
    { question: "What is the success rate of your students?", answer: "Our students have a high pass rate for the driving test. We are committed to providing quality education to ensure your success." },
    { question: "Are there any prerequisites for the courses?", answer: "There are no specific prerequisites for our courses. Anyone who wants to learn driving can enroll." },
    { question: "What vehicles are used for training?", answer: "We use modern vehicles equipped with the latest technology for training. This ensures a safe and effective learning experience." },
    { question: "Can I choose my instructor?", answer: "Yes, you can request a specific instructor if you prefer. We strive to accommodate all requests to make your learning experience comfortable." },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-8 bg-white">
      <h2 className="text-3xl font-semibold text-center mb-8">Course FAQs</h2>
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4">
            <div
              className={`flex justify-between items-center cursor-pointer text-xl font-bold ${
                openIndex === index ? 'text-blue-500' : ''
              }`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-2xl">{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && <p className="mt-2 text-lg">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseFAQs;
