import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="p-8 bg-blue-300 text-black text-center">
      <h2 className="text-3xl font-semibold mb-4">Ready to Start Driving?</h2>
      <p className="mb-8">Sign up now and take the first step towards getting your driver's license!</p>
      <Link to='/signup'><button className="bg-white text-blue-600 font-bold py-2 px-4 rounded">Sign Up Now</button></Link>
    </div>
  );
};

export default CallToAction;
