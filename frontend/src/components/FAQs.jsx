import React, { useState } from 'react';

const FAQs = ({faqs}) => {
  const [openIndex, setOpenIndex] = useState(null);

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
