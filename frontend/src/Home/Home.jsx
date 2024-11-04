import React from 'react';
import Banner from './HomeComponents/Banner';
import Courses from './HomeComponents/CoursesHome';
import SubBlog from './HomeComponents/SubBlog';
import AboutUs from './HomeComponents/AboutHome';
import FAQs from '../components/FAQs';
import CallToAction from './HomeComponents/CallToAction';
import Testimonials from './HomeComponents/Testimonials';
import KeyBenefits from './HomeComponents/KeyBenefits';
import MockQuizFeature from '../components/MockQuizFeature';

const homeFAQs = [
  { question: "What are the course timings?", answer: "We offer flexible timings to fit your busy schedule. You can check our website or contact us for more details." },
  { question: "What is the success rate of your students?", answer: "Our students have a high pass rate for the driving test. We are committed to providing quality education to ensure your success." },
  { question: "What types of courses do you offer?", answer: "We offer courses for both two-wheeler and four-wheeler licenses. We also have specialized courses for different skill levels and needs." },
  { question: "How can I register for a course?", answer: "You can register for a course by only visiting our institute. Our team will guide you through the registration process." },
  { question: "What is the fee structure for the courses?", answer: "The fee structure varies based on the type and duration of the course. Please visit our website or contact us for detailed information." },
  { question: "Do you offer any discounts or promotions?", answer: "Yes, we occasionally offer discounts and promotions. Please check our website or subscribe to our newsletter for updates." },
];

const Home = () => {
  return (
    <>
      <Banner />
      <div className=" h-full space-y-16">
        <AboutUs />
        <KeyBenefits />
        <Courses />
        <MockQuizFeature headings="Boost Your Confidence with Mock Quizzes" paragraph={"Prepare for your Learner's License exam with our comprehensive mock quizzes designed to mimic the actual test format. Identify your strengths and weaknesses, and choose the best course to fill any knowledge gaps. Take a mock quiz today and get ready for success!"}/>
        <Testimonials />
        <SubBlog />
      </div>
        <FAQs faqs={homeFAQs} />
        <CallToAction />
    </>
  );
};

export default Home;
