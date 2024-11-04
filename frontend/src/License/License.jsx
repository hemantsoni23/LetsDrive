// License.jsx
import React from 'react';
import FAQs from '../components/FAQs';
import { useNavigate } from 'react-router-dom';
// import RoadSignSlider from '../components/RoadSignSlider';

const License = () => {
  const navigate = useNavigate();
  const licenseFAQs = [
    { question: "How do I apply for a learner's license?", answer: "To apply for a learner's license, you need to fill out the application form available on our website and submit the necessary documents." },
    { question: "What are the eligibility criteria for a learner's license?", answer: "You must be at least 18 years old and pass a preliminary test on traffic rules and signs to be eligible for a learner's license." },
    { question: "How do I book a slot for the permanent license test?", answer: "You can book a slot for the permanent license test through our website. Select the 'Book Test Slot' option and follow the instructions." },
    { question: "What documents are required for the permanent license?", answer: "You need to provide proof of identity, proof of address, and your learner's license to apply for a permanent license." },
    { question: "What is the fee for the license application?", answer: "The fee varies depending on the type of license and the state regulations. Please check our website for detailed information." },
  ];

  return (
    <div className="min-h-screen mt-0">
      <section className="p-8 bg-white shadow-md rounded-lg mb-8">
        <h2 className="text-3xl font-semibold mb-4">Learner License Registration (LLR)</h2>
        <p className="text-lg mb-4">To register for a learner's license, you must complete the online application form and submit the required documents. The process includes a preliminary test on traffic rules and regulations.</p>
        <div className="flex gap-4">
          <button className="bg-blue-500 uppercase text-white py-2 px-4 rounded-lg">Get a Learner License</button>
          <button className="bg-gray-500 uppercase text-white py-2 px-4 rounded-lg" onClick={()=>navigate('/quiz')}>Let's Start Mock LLR Test</button>
        </div>
      </section>

      <section className="p-8 bg-white shadow-md rounded-lg mb-8">
        <h2 className="text-3xl font-semibold mb-4">Permanent License Registration</h2>
        <p className="text-lg mb-4">To apply for a permanent license, you need to complete the application form, submit the required documents, and pass the driving test. The eligibility criteria include having a valid learner's license and meeting the age requirement.</p>
        <button className="bg-green-500 uppercase text-white py-2 px-4 rounded-lg">Book Permanent License Test Slot</button>
      </section>

      <section className="p-8 bg-white shadow-md rounded-lg mb-8">
        <h2 className="text-3xl font-semibold mb-4">Road Signs</h2>
        {/* <RoadSignSlider /> */}
        <p className="text-lg">Learn about the different road signs and their meanings to drive safely and confidently. Take the quiz to test your knowledge of road signs.<br/><br/> <b>This section will be completed after the launch of the beta version of our website.</b></p>
      </section>
{/* 
      <section className="p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h2> */}
        <FAQs faqs={licenseFAQs} />
      {/* </section> */}
    </div>
  );
};

export default License;
