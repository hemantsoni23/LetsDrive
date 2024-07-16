import React from 'react';
import svg from '../../assets/31210601_7779604.svg';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="px-4 mt-16 lg:mt-0 lg:px-24 bg-teal-100 flex items-center h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="md:w-1/2 space-y-8 h-full">
          <h1 className="text-5xl font-bold leading-tight text-black">
            Get Your Driver's License - Fast & Easy
          </h1>
          {/* <h2 className="text-5xl font-bold leading-snug">Welcome to the world of</h2>
          <h1 className="text-7xl font-bold leading-snug">Driving</h1>
          <p className="mt-4 text-xl">Learn to Drive with Confidence. Get Your License Today!</p> */}
          <p className="text-xl text-gray-700">Learn from certified instructors & pass your test with confidence.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to="/learnToDrive">Explore Now</Link>
          </button>
        </div>
        <img className="md:w-1/2 object-cover" src={svg} alt="Driving school students practicing" />
      </div>
    </div>
  );
};


export default Banner;
