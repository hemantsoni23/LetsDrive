import React, { useState } from 'react';

const FAQs = ({faqs}) => {
  const [openIndex, setOpenIndex] = useState(null);
  // const faqs = [
  //   { question: "What are the course timings?", answer: "We offer flexible timings to fit your busy schedule. You can check our website or contact us for more details." },
  //   { question: "What is the success rate of your students?", answer: "Our students have a high pass rate for the driving test. We are committed to providing quality education to ensure your success." },
  //   { question: "What types of courses do you offer?", answer: "We offer courses for both two-wheeler and four-wheeler licenses. We also have specialized courses for different skill levels and needs." },
  //   { question: "How can I register for a course?", answer: "You can register for a course online through our website or visit our institute. Our team will guide you through the registration process." },
  //   { question: "What is the fee structure for the courses?", answer: "The fee structure varies based on the type and duration of the course. Please visit our website or contact us for detailed information." },
  //   { question: "Do you offer any discounts or promotions?", answer: "Yes, we occasionally offer discounts and promotions. Please check our website or subscribe to our newsletter for updates." },
  // ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 bg-white p-4 rounded-lg shadow-md">
            <div
              className={`flex justify-between items-center cursor-pointer text-xl font-bold ${
                openIndex === index ? 'text-blue-500' : ''
              }`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-2xl">{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && <p className="mt-2 text-lg text-gray-700">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
