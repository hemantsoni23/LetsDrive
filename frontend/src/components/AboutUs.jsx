// AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <section className="about-us py-12 px-4 md:px-20 lg:px-40">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      <p className="text-lg leading-relaxed text-gray-700">
        Welcome to <strong>LetsDrive</strong>, your ultimate resource for learning to drive and acquiring your driving license.
        Our mission is to make driving education accessible, affordable, and efficient. We provide a range of courses designed by experts
        to prepare you thoroughly for both learner and advanced licenses. With our comprehensive resources, quizzes, and expert support,
        you can gain the confidence and skills needed to become a responsible driver.
      </p>
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside">
          <li>Expert-designed courses for beginners and experienced learners</li>
          <li>Mock tests and quizzes to prepare you for the real test</li>
          <li>24/7 access to all learning materials</li>
          <li>Guidance from certified driving instructors</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutUs;
