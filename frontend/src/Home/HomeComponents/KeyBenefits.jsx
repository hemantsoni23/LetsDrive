import React from 'react';

const KeyBenefits = () => {
  const benefits = [
    { title: "Certified Instructors", description: "Our team consists of government-certified instructors with over 10 years of experience." },
    { title: "Flexible Scheduling", description: "We offer day, evening, and weekend classes to fit your busy schedule." },
    { title: "Personalized Learning", description: "Our instructors tailor their approach to your individual learning style." },
    { title: "High Pass Rates", description: "Our students boast a 90% success rate in passing the driving test on the first attempt." },
  ];
  

  return (
    <div className="p-8 bg-white">
      <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Us?</h2>
      <div className="flex flex-wrap justify-around">
        {benefits.map((benefit, index) => (
          <div key={index} className="max-w-xs p-4">
            <h3 className="text-xl font-bold">{benefit.title}</h3>
            <p className="mt-2">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyBenefits;
