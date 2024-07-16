import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from './CourseModal';
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

const SwiperCourse = ({ data }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const getTypeText = (type) => {
    switch (type) {
      case 'Four':
        return 'For Four Wheeler';
      case 'Two':
        return 'For Two Wheeler';
      case 'Both':
        return 'For Both Two and Four Wheeler';
      default:
        return 'Unknown';
    }
  };

  const handleLearnMore = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="relative z-10 slider-container shadow-lg rounded-lg">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div
            className="container bg-white rounded-lg shadow-lg p-6 m-4"
            key={index}
          >
            <h3 className="text-2xl font-bold mb-2 text-gray-800">
              {item.course_name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {item.description.length > 50
                ? `${item.description.slice(0, 50)}...`
                : item.description}
            </p>
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-gray-700 font-semibold">
                  Practical Sessions:{' '}
                  <span className="font-normal">{item.practical_session}</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  Simulation Sessions:{' '}
                  <span className="font-normal">{item.simulation_session}</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  Theory Sessions:{' '}
                  <span className="font-normal">{item.theory_session}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-700 font-semibold">
                  Price: <span className="font-normal">${item.price}</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  Type: <span className="font-normal">{getTypeText(item.type)}</span>
                </p>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              onClick={() => handleLearnMore(item)}
            >
              Learn More
            </button>
          </div>
        ))}
      </Slider>
      {selectedCourse && <Modal isOpen={!!selectedCourse} onClose={closeModal} course={selectedCourse} />}
    </div>
  );
};

export default SwiperCourse;
