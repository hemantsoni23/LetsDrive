import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwiperCourse from './CourseSlider';

function CoursesHome() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_API_ROUTE + '/courses/list';
        console.log(url);
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Courses</h1>
      <SwiperCourse data={data} />
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">
        Enroll Now
      </button> */}
    </div>
  );
}

export default CoursesHome;
