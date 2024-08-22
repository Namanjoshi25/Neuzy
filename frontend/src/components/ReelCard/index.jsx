import React, { useEffect, useRef, useState } from "react";
import { useInView } from 'react-intersection-observer';
import  '../../styles/index.css'
import { Link } from "react-router-dom";
  const Reel = (props) => {
    console.log(props);
    const videoRef = useRef(null);
    const progressRef= useRef()

    const [duration, setDuration] = useState(0);
  
    const [isPlaying, setIsPlaying] = useState(true);
    const { ref, inView } = useInView({
      triggerOnce: false,
      threshold: 0.5, // Play video when 50% of it is in view
    });
   
    useEffect(() => {
      const video = videoRef.current;
  
      const handleTimeUpdate = () => {
        const currentTime = video.currentTime;
        const progress = (currentTime / duration) * 100;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
      };
  
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
      };
  
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
  
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }, [duration]);
  
    // Calculate the progress percentage
  
 
    const handlePlayPause = () => {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };
  
    return (
      <div ref={ref} className="relative h-full w-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={props.news.videoUrl}
          type="video/mp4"
          loop
          muted
          playsInline
          onClick={handlePlayPause}
          autoPlay
          
        /> 
        <div className="absolute ml-5 flex-col gap-5 justify-center items-center  bottom-14 bg-transparent z-10 text-white-A700 w-20">
        <div className="flex gap-5 justify-center items-center">  
          <img  className="  ml-3    h-10  w-10  rounded-full" src={props.author.profileImg} alt="" />
          <Link to={`/news/${props.author._id}`}>
          <p >{props.author.name}</p>
          </Link>
       
        </div>
        <div className=" w-20">
        <p className=" mt-2 text-xs text-white-A700 w-80">{props.news.title}</p>
        <Link className=" w-full text-xs mt-2 underline underline-offset-1  font-semibold hover:text-blue-400" to={`/news/singleVideo/${props._id}`}>Read More</Link>
        </div>
          </div>
        {!isPlaying && (
          <div className="absolute inset-0 flex justify-center items-center text-white">
            <button
              className="bg-black bg-opacity-50 rounded-full text-white-A700 p-4"
              onClick={handlePlayPause}
            >
              ▶️
            </button>
          </div>
        )}
         <div className="progress-bar-container absolute bottom-0 left-0 w-full h-[2px] z-10  ">
        <div
          className="progress-bar bg-white rounded-md mb-1 h-full"
          
          ref={progressRef}
        ></div>
      </div>
      </div>
    );
  };

  export default Reel;