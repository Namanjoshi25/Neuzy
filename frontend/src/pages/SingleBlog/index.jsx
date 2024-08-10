import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Text } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import axiosInstance from "axios/axios.config";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { timeAgo } from "utils/time.util";
import { Link } from "react-router-dom";
import AllBlogCardnews from "components/AllBlogCardnews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function SingleBlogPage() {
  
  const { id: newsId } = useParams();
  const [news, setNews] = useState(null);
  const[relatedPosts , setRelatedPosts] = useState([])
 
  useEffect(() => {
    
const fetchNewsById =async()=>{
  
  const res = await axiosInstance.get(`/news/get-news-by-id/${newsId}`);
  const res2  = await axiosInstance.get(`/news/all-news?category=${res.data.data.category}`)

  setRelatedPosts(res2.data.data)
 setNews(res.data.data)
}     
  
fetchNewsById()
  }, [newsId]);

  return (
    <>
    {news &&   <div className="w-full bg-white-A700">
        <div className="flex flex-col items-center">
          <Header className="self-stretch" />
          <div className="container-sm mt-[52px] px-[329px] md:p-5 md:px-5">
            <div className="flex flex-col items-center">
              <div className="flex w-[16%] items-center gap-2.5 md:w-full">
                <div className="h-[15px] w-[15px] rounded-[7px] bg-blue_gray-900" />
                <Text size="3xl" as="p" className="tracking-[-0.50px] !text-black-900">
                  {news.category}
                </Text>
              </div>
              <Heading
                size="3xl"
                as="h1"
                className="mt-5 w-full text-center !font-bold leading-[43px] tracking-[-0.50px]"
              >
                {news.title}
              </Heading>
              <div className="mt-10 flex flex-wrap gap-1">
                <Heading as="h2" className="tracking-[-0.50px]">
                 {format(new Date(news.createdAt),"dd MMMM yy")} 
                </Heading>
                <Heading as="h3" className="tracking-[-0.50px] !text-black-900_7f">
                  <span className="text-black-900_7f">-&nbsp;</span>
                  <span className="font-normal text-black-900">{timeAgo(news.createdAt)}</span>
                </Heading>
              </div>
            </div>
          </div>
          <Img
            src={news.images[0]}
            alt="image"
            className="mt-[47px] h-[497px] w-full object-cover md:h-auto"
          />
          <div className="container-sm mt-[60px] flex flex-col items-center gap-[49px] px-[220px] md:p-5 md:px-5">
            <div className="flex flex-col gap-[51px] self-stretch sm:gap-[25px]">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col items-start gap-6">
                 {/*  <Heading size="3xl" as="h2" className="tracking-[-0.50px]">
                    About Team
                  </Heading> */}
                  <Text size="xl" as="p" className="w-full leading-[35px] tracking-[-0.50px] !text-black-900">
                    {news.content}
                  </Text>
               {/*    <Text size="xl" as="p" className="w-full leading-[35px] tracking-[-0.50px] !text-black-900">
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                  </Text> */}
                </div>
{/*                 <Img src="images/img_unsplash_xhzbzv4naw.png" alt="unsplash" className="h-[400px] object-cover" />
 */}              </div>
         
              
              <div className="h-px bg-black-900_4c" />
            </div>
       
            <div className="flex w-[45%] flex-col items-center gap-[50px] md:w-full">
          
              <div className="flex flex-col items-center gap-5 self-stretch">
             
                <div className="flex w-[50%] items-start gap-2.5 md:w-full">
                  <Img
                    src={news.author.profileImg}
                    alt="unsplash"
                    className="h-[60px] w-[60px] rounded-[50%]"
                  />
                 
                  <div className="flex flex-col items-start gap-1.5">
                    <Link to={`/news/${news.author._id}`}>
                    <Heading size="2xl" as="h6" className="tracking-[-0.50px]">
                      {news.author.name}
                    </Heading>
                    </Link>
                    <Text as="p" className="tracking-[-0.50px] !text-black-900_7f">
                    Tagline
                    </Text>
                  </div>
                </div>
                <Text size="md" as="p" className="w-full text-center leading-[35px] tracking-[-0.50px] !text-black-900">
                  {news.author.tagline}
                </Text>
              </div>
              <div className="flex flex-col items-center gap-6">
                <Heading as="h6" className="tracking-[-0.50px]">
                  Connect with Author
                </Heading>
                <div className="flex gap-5">
                  <a href={news.author.facebook} className=" cursor-pointer hover:text-blue-500"> <FontAwesomeIcon  icon={faFacebook} size="lg" /></a>
                  <a href={news.author.instagram} className=" cursor-pointer hover:text-blue-500">  <FontAwesomeIcon icon={faInstagram } size="lg"/></a>
                  <a href={news.author.twitter} className=" cursor-pointer hover:text-blue-500">  <FontAwesomeIcon icon={faTwitter} size="lg"/></a>
                 
                 
                </div>
              </div>
             
            </div>
        
          </div>
          <div className="mt-[120px] flex flex-col items-center gap-[120px] self-stretch md:gap-[90px] sm:gap-[60px]">
            <div className="container-xs flex md:p-5">
              <div className="flex w-full flex-col gap-[49px]">
                <div className="flex flex-col gap-7">
                  <div className="flex items-center justify-between gap-5">
                    <Heading size="3xl" as="h2" className="self-start tracking-[-0.50px]">
                      Related News
                    </Heading>
                  <Link to={`/allBlog?category=${news.category}`}>
                      <Button shape="round" className="min-w-[122px] self-end font-semibold tracking-[-0.50px] sm:px-5">
                        View All
                      </Button>
                      </Link>
                  </div>
                  <div className="h-px bg-black-900_7f" />
                </div>
                <div className="flex justify-around gap-5 md:flex-col md:items-center md:justify-center">
                {relatedPosts.slice(0, 3).map((d, index) => (
      <AllBlogCardnews
        {...d}
        key={"relatedNews" + index}
        className="flex-1 min-w-[200px] max-w-[300px]   justify-around"
      />
    ))}
                
                 
                 
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>}
    
     
    </>
  );
}
