// RoadSignSlider.jsx
import React from 'react';
import Slider from 'react-slick';

// const roadSigns = [
//   { img: 'sign1.jpg', description: 'Stop sign' },
//   { img: 'sign2.jpg', description: 'Yield sign' },
//   { img: 'sign3.jpg', description: 'No entry sign' },
// ];

const RoadSignSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {/* {roadSigns.map((sign, index) => (
        <div key={index} className="p-4">
          <img src={sign.img} alt={sign.description} className="w-full h-48 object-cover rounded-lg" />
          <div className="text-center mt-2 text-lg">{sign.description}</div>
        </div>
      ))} */}
    </Slider>
  );
};

export default RoadSignSlider;
