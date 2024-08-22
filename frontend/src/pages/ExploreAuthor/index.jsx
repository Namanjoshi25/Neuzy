import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "axios/axios.config";
import { Heading, Img } from "components";
import AuthorProfileCard from "components/AuthorProfileCard";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorNewsListCard from "components/AuthorNewsListCard";
import Pagination from "components/PageChanger";
import HomepageColumn1 from "components/HomepageColumn1";
import HomepageRowhowtomaximiz from "components/HomepageRowhowtomaximiz";
import { Link } from "react-router-dom";
import Footer from "components/Footer";
import VideoNewsCard from "components/VideoNewsCard";

import { TailSpin } from "react-loader-spinner";

function index() {
  const params = useParams();
  const authorId = params.authorId;

  const [author, setAuthor] = useState({});
  const [news, setNews] = useState([]);
  const [newsType , setNewsType] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAuthor() {
      console.log("rendererd");
      const res = await axiosInstance.get(
        `/author/get-author-by-id/${authorId}`

      );
      setAuthor(res.data.data);
      if(!newsType){
       
        const newsResposnse = await axiosInstance.get(`/news/${authorId}`);
       
        setNews(newsResposnse.data.data);
        setLoading(false)

      }else{
        const res = await axiosInstance.get(`/video/get-videos-by-author/${authorId}`)
        setNews(res.data.data)
        setLoading(false)
      }
     
    }
    fetchAuthor();
  }, [newsType]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(news?.length / postsPerPage);

  //calculate the post as per the pages
  const indexOfLastPost = Math.min(currentPage * postsPerPage, news.length);
  const indexOfFirstPost = (currentPage - 1) * postsPerPage;
  const currentPosts = news.slice(indexOfFirstPost, indexOfLastPost);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const toggleNewsType = ()=>{
    setNewsType( !newsType);
    setLoading(true)
   
  }

  return (
    <div className="flex flex-col  min-h-screen  ">
      <Header />
    
 
      
      <div className=" flex flex-col justify-center items-center">
      <div className="container flex  flex-col items-center justify-center   h-1/6  mx-auto p-4">
        <div className="bg-white flex   justify-around w-3/4 h-20  shadow-md rounded p-4">
          <div className="  flex w-1/2 ">
            <Img
              className="overflow-hidden rounded-2xl mr-2 "
              src={author.profileImg}
            ></Img>
            <div className="flex flex-col w-1/2 ml-2">
              <p>
                <strong>Name:</strong> {author.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${author.email}`} className="text-blue-500">
                  {author.email}
                </a>
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <strong>Tagline:</strong>
              <p>{author.tagline}"</p>
            </div>
          </div>
          <div className="flex flex-col items-center mr-5 ">
            <p>
              <strong>Socials:</strong>
            </p>
            <ul className="list-none pl-0 flex">
              <li>
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mr-2"
                >
                  {" "}
                  <FontAwesomeIcon icon={faTwitter} />{" "}
                </a>
              </li>
              <li>
                <a
                  href={author.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mr-2"
                >
                  {" "}
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a
                  href={author.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mr-2"
                >
                  {" "}
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-3 mt-4  justify-between items-center ">
          <button onClick={toggleNewsType} className={`${newsType ? " border-0  text-gray-600" : "border-b-2 border-black-900 text-black-900 font-semibold"}`}>News posts</button>
          <button  onClick={toggleNewsType}  className={`${newsType ? " border-b-2 border-black-900 text-black-900 font-semibold " : " border-0 text-gray-600"}`}>  Quick News</button>
        </div>
        </div>
        {loading && 
    <>  <TailSpin color="red" radius={"8px"} />
           <div style={{ height: 200, background: '#000' }}>
         
         </div>
         </>
        }
        {newsType && news.length > 0 && !loading
         ?  
         <> 
         <div className=" w-3/4 mt-3   items-center flex  flex-col">
         <div className=" flex w-full gap-3 items-center justify-center">
         {
          
          currentPosts.length > 0 &&
            currentPosts
              .slice(0, 3)
              .map((data, index) => (
             
                <VideoNewsCard
                className="  shadow-md m-4 w-[370px] h-[270px] "
                isAuthor ={false}
                  news={data}
                  key={"AuthorNewsListCard" + index}
                />
 

              ))}

         </div>
         <div className=" flex w-full gap-3 items-center justify-center">
         {
          
          currentPosts.length > 0 &&
            currentPosts
              .slice(3, 6)
              .map((data, index) => (
            
                <VideoNewsCard
                className="  shadow-md m-4 w-[370px] h-[270px]  "
                isAuthor ={false}
             
                  news={data}
                  key={"AuthorNewsListCard" + index}
                />

              ))}


         </div>
      
       </div>
       <Pagination
         totalPages={totalPages}
         currentPage={currentPage}
         onPageChange={onPageChange}
       />
       </>

         : 
         <>
         <div className=" w-3/4 mt-3   items-center flex  flex-col">
         {!loading && currentPosts.length > 0 &&
           currentPosts
             .slice(0, 6)
             .map((data, index) => (
              
               <HomepageRowhowtomaximiz
               className="  shadow-md m-4 w-3/4 "
            
                 news={data}
                 key={"AuthorNewsListCard" + index}
               />


             ))}
       </div>
       <Pagination
         totalPages={totalPages}
         currentPage={currentPage}
         onPageChange={onPageChange}
       />
       </>

        
      }
      
     </div>
     <Footer/>
    </div>
  );
}

export default index;
