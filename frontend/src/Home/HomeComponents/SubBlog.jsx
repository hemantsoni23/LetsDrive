import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from './BlogModal';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow`} onClick={onClick}>
      <FaArrowRight style={{ color: 'black', fontSize: '20px' }} />
    </div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow`} onClick={onClick}>
      <FaArrowLeft style={{ color: 'black', fontSize: '20px' }} />
    </div>
  );
}

const SubBlog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      title: 'How to Get a Four-Wheeler License',
      description:
        'This blog provides detailed information on how to obtain a four-wheeler driving license, including the necessary documents, eligibility criteria, and the steps involved in the application process.',
    },
    {
      title: 'Steps to Get a Two-Wheeler License',
      description:
        'This blog outlines the process of getting a two-wheeler license. It covers the eligibility requirements, required documentation, and the practical and theoretical tests you need to pass.',
    },
    {
      title: 'Guide to Obtaining an International Driving License',
      description:
        'Learn about the process of obtaining an international driving license, which allows you to drive in multiple countries. This guide covers the application process, required documents, and tips for a successful application.',
    },
  ];

  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipeToSlide: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: 'linear',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleLearnMore = (blog) => {
    setSelectedBlog(blog);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="container mx-auto my-16 px-4 lg:px-0">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 border-b border-gray-300 pb-2">
        Learn How to Get a License
      </h1>
      <div className="blog-carousel">
        <Slider {...settings}>
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 m-4 blog-card hover:shadow-xl hover:bg-gray-100">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {blog.description.length > 150
                  ? `${blog.description.slice(0, 150)}...`
                  : blog.description}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                onClick={() => handleLearnMore(blog)}
              >
                Learn More
              </button>
            </div>
          ))}
        </Slider>
      </div>
      {selectedBlog && <Modal isOpen={!!selectedBlog} onClose={closeModal} blog={selectedBlog} />}
    </div>
  );
};

export default SubBlog;
