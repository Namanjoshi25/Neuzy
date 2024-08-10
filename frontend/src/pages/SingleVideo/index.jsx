import axiosInstance from "axios/axios.config";
import { Heading ,Img} from "components";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text } from "components";
import format from "date-fns/format";
import { timeAgo } from "utils/time.util";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Footer from "components/Footer";


function index() {
  const { id: videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchNewsById = async () => {
      const res = await axiosInstance.get(`/video/get-video-by-id/${videoId}`);

      setVideo(res.data.data);
      setLoading(false);
    };

    fetchNewsById();
  }, [videoId]);
  return (
    <div className=" w-full bg-white-A700">
      {loading ? null : (
        <div>
          <Header />
          <div className="flex flex-col px-[329px] items-center">
            <div className=" flex flex-col items-center  mt-10 mb-10">
              <div className=" flex w-[16%] items-center gap-2.5 md:w-full">
                <div className="h-[15px] w-[15px] rounded-[7px] bg-blue_gray-900" />
                <Text
                  size="3xl"
                  as="p"
                  className="tracking-[-0.50px] !text-black-900"
                >
                  {video.category}
                </Text>
              </div>

              <Heading
                size="3xl"
                as="h1"
                className="mt-5 w-full text-center !font-bold leading-[43px] tracking-[-0.50px]"
              >
                {video.title}
              </Heading>
              <div className="mt-10 flex flex-wrap gap-1">
                <Heading as="h2" className="tracking-[-0.50px]">
                  {format(new Date(video.createdAt), "dd MMMM yy")}
                </Heading>
                <Heading
                  as="h3"
                  className="tracking-[-0.50px] !text-black-900_7f"
                >
                  <span className="text-black-900_7f">-&nbsp;</span>
                  <span className="font-normal text-black-900">
                    {timeAgo(video.createdAt)}
                  </span>
                </Heading>
              </div>
            </div>
            <div className=" w-[550px]  ">
              <video autoPlay src={video.videoUrl} />
            </div>
            <Text
              size="xl"
              as="p"
              className="w-full mt-5 leading-[35px] tracking-[-0.50px] !text-black-900"
            >
              {video.description}
            </Text>

            <div className="h-px bg-black-900_4c w-full" />

            <div className="flex w-[45%]  my-10 flex-col items-center gap-[50px] md:w-full">
          
          <div className="flex flex-col items-center gap-5 self-stretch">
         
            <div className="flex w-[50%] items-start gap-2.5 md:w-full">
              <Img
                src={video.author.profileImg}
                alt="unsplash"
                className="h-[60px] w-[60px] rounded-[50%]"
              />
             
              <div className="flex flex-col items-start gap-1.5">
                <Link to={`/news/${video.author._id}`}>
                <Heading size="2xl" as="h6" className="tracking-[-0.50px]">
                  {video.author.name}
                </Heading>
                </Link>
                <Text as="p" className="tracking-[-0.50px] !text-black-900_7f">
                Tagline
                </Text>
              </div>
            </div>
            <Text size="md" as="p" className="w-full text-center leading-[35px] tracking-[-0.50px] !text-black-900">
              {video.author.tagline}
            </Text>
          </div>
          <div className="flex flex-col items-center gap-6">
            <Heading as="h6" className="tracking-[-0.50px]">
              Connect with Author
            </Heading>
            <div className="flex gap-5">
              <a href={video.author.facebook} className=" cursor-pointer hover:text-blue-500"> <FontAwesomeIcon  icon={faFacebook} size="lg" /></a>
              <a href={video.author.instagram} className=" cursor-pointer hover:text-blue-500">  <FontAwesomeIcon icon={faInstagram } size="lg"/></a>
              <a href={video.author.twitter} className=" cursor-pointer hover:text-blue-500">  <FontAwesomeIcon icon={faTwitter} size="lg"/></a>
             
             
            </div>
          </div>
         
        </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default index;
