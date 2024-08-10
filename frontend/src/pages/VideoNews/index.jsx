import React, { useState, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import axiosInstance from '../../axios/axios.config'; // Your axios instance for API calls
import Header from '../../components/Header'; // Your Header component
import Reel from '../../components/ReelCard'; // Your Reel component
import Footer from 'components/Footer';
import { Heading } from 'components';

const ReelScroller = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    async function fetchVideos() {
      const res = await axiosInstance.get('/video/get-videos');
      setVideos(res.data.data);
    }
    fetchVideos();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.clientHeight * currentIndex,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handleSwipe = (delta) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + delta;
      if (newIndex < 0) return 0;
      if (newIndex >= videos.length) return videos.length - 1;
      return newIndex;
    });
  };

  const handlers = useSwipeable({
    onSwipedUp: () => {
    console.log("SCroll up");
      handleSwipe(1);
    },
    onSwipedDown: () => {
          handleSwipe(-1);
    },
    delta: 50,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex     flex-grow  h-screen overflow-hidden ">
        <div className="flex justify-center flex-col items-center w-1/3 bg-gray-100 p-4 sm:hidden  ">
        <Heading size="3xl" as="h1" className="w-[76%] text-center leading-[43px] tracking-[-0.50px] md:w-full">
               Quick News
              </Heading>
          <p className="mt-4 text-gray-700 text-center">The minute video news</p>
        </div>
        <div
          className="w-[400px]   overflow-y-hidden snap-y snap-mandatory"
          {...handlers}
          ref={containerRef}
        >
          {videos.length > 0 &&
            videos.map((video, index) => (
              <div
                key={index}
                className="w-full h-screen snap-center object-contain flex-shrink-0"
              >
                <Reel {...video} isActive={index === currentIndex} />
              </div>
            ))}
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default ReelScroller;
