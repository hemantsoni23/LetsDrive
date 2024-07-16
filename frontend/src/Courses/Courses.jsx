// Courses.jsx
import React, { useState } from 'react';
import Expectations from './Expectations';
import CourseDetails from './CourseDetails';
import FAQs from '../components/FAQs';
import MockQuizFeature from '../components/MockQuizFeature';
import MockQuizModal from './MockQuizModal';

const courseFAQs = [
  { question: "What are the course timings?", answer: "We offer flexible timings to fit your busy schedule. You can check our website or contact us for more details." },
  { question: "What is the success rate of your students?", answer: "Our students have a high pass rate for the driving test. We are committed to providing quality education to ensure your success." },
  { question: "Are there any prerequisites for the courses?", answer: "There are no specific prerequisites for our courses. Anyone who wants to learn driving can enroll." },
  { question: "What vehicles are used for training?", answer: "We use modern vehicles equipped with the latest technology for training. This ensures a safe and effective learning experience." },
  { question: "Can I choose my instructor?", answer: "Yes, you can request a specific instructor if you prefer. We strive to accommodate all requests to make your learning experience comfortable." },
];

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen pt-10">
      <Expectations />
      <MockQuizFeature 
        headings="Select the best course for you" 
        paragraph="Take our mock test to determine which course is best suited for you. This will help us tailor our training to meet your needs." 
        openModal={openModal}
      />
      <CourseDetails courses={courses} setCourses={setCourses} />
      <FAQs faqs={courseFAQs} />
      <MockQuizModal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        courses={courses}
      />
    </div>
  );
};

export default Courses;
