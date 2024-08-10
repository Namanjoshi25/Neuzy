import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Img, Heading, Button, Input } from "../../components";
import AllBlogCardnews from "../../components/AllBlogCardnews";
import AllBlogCardnews1 from "../../components/AllBlogCardnews1";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import axiosInstance from "axios/axios.config";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Pagination from "components/PageChanger";
import FilterComponent from "components/Filter";
import axios from "axios";
import Search from "components/Search";



export default function AllBlogPage() {

  
  
  const [searchParams] = useSearchParams();
  const location = useLocation()
  const navigate = useNavigate()
  let category = searchParams.get('category');


  const [allPosts, setAllPosts] = useState([]);
  const [navigateSidebar ,setNavigateSideBar] = useState(1);
  const [sideBarPosts ,setSideBarPosts] = useState([]);
  const [filterToggle ,setFilterToggle] = useState(false);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSideBar = async (e)=>{
    
    if(e.target.id ==1){
      const res = await axiosInstance.get(`/news/all-news`);
      setSideBarPosts(res.data.data)
      setNavigateSideBar(1)

    }else if(e.target.id == 2){
      const res = await axiosInstance.get(`/news/all-news?category=Life`);
      console.log(res);
      setSideBarPosts(res.data.data)
      setNavigateSideBar(2)
    }else if(e.target.id ==3) {
      const res = await axiosInstance.get(`/news/all-news?category=Entertainment`);
      setSideBarPosts(res.data.data)
      setNavigateSideBar(3)
    }
  }

  
  useEffect(() => {
    
   const fetchAllPosts = async()=>{
  
if(category){
  const res = await axiosInstance.get(`/news/all-news?category=${category}`);

  setAllPosts(res.data.data)
}else{
  const res = await axiosInstance.get(`/news/all-news`);
 
  setAllPosts(res.data.data)
}
 
    const sideBarRes = await axiosInstance.get(`/news/all-news`)
    setSideBarPosts(sideBarRes.data.data)
   }

   fetchAllPosts();
  }, [category]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil((allPosts?.length)/postsPerPage);
   
  //calculate the post as per the pages
  const indexOfLastPost = Math.min(currentPage * postsPerPage, allPosts.length);
  const indexOfFirstPost = (currentPage - 1) * postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);


 const togglefilter = (e)=>{
  setFilterToggle(!filterToggle)
 
 }

 const handleApplyFilter = (filters)=>{
  console.log(filters);

  const params = new URLSearchParams(location.search);
  
 
  
    if (filters.category && filters.dateRange) {
      params.set('category', filters.category.name);
      params.set('sort', filters.dateRange.name);
    } else if (filters.category || filters.dateRange) {
      if (filters.category) {
        params.set('category', filters.category.name);
        params.delete('sort');
      }
      if (filters.dateRange) {
        params.set('sort', filters.dateRange.name);
        params.delete('category');
      }
    } else {
      params.delete('category');
      params.delete('sort');
    }
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
 }

 
 
  return (
    <>
      <Helmet>
        <title>Neuzy</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="w-full  relative bg-white-A700">
        {filterToggle && <FilterComponent toggleFilter={togglefilter} onApplyFilter={handleApplyFilter}/>}
        <div className="flex flex-col items-center">
          <Header className="self-stretch" />
          <div className="container-sm mt-[50px] px-[330px] md:p-5 md:px-5">
            <div className="flex flex-col items-center gap-[70px] md:gap-[52px] sm:gap-[35px]">
              <Heading size="3xl" as="h1" className="w-[76%] text-center leading-[43px] tracking-[-0.50px] md:w-full">
                Read the latest news from around the world
              </Heading>
              <div className="flex items-center justify-between gap-5 self-stretch rounded-[15px] bg-gray-50 pl-2.5 md:flex-col">
               <Search/>
                <div className="flex items-center">
                  <div className="h-[38px] w-px bg-black-900_7f" />
                  <Button
                    size="9xl"
                    rightIcon={<Img src="images/img_bxfilter.svg" alt="bx:filter" className="h-[24px] w-[24px]" />}
                    className="min-w-[110px] gap-[11px] rounded-[15px] font-semibold tracking-[-0.50px]"
                    onClick ={togglefilter}
                  >
                    Filter
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="container-sm mt-[100px] flex items-start justify-center gap-6 md:flex-col md:p-5">
           <div className="flex flex-1 flex-col items-center justify-center gap-[50px] md:self-stretch">
           <div className="flex flex-col gap-[30px] self-stretch">
  <div className="flex flex-wrap gap-5 justify-center w-full sm:flex-col sm:justify-center sm:items-center ">
    {currentPosts.slice(0, 3).map((d, index) => (
      <AllBlogCardnews
        {...d}
        key={"listtagone" + index}
        className="flex-1 min-w-[200px] max-w-[300px]"
      />
    ))}
  </div>
  <div className="flex flex-wrap gap-5 justify-center w-full">
    {currentPosts.length > 3 &&
      currentPosts.slice(3, 6).map((d, index) => (
        <AllBlogCardnews
          {...d}
          key={"listtagtwo" + index}
          className="flex-1 min-w-[200px] max-w-[300px]"
        />
      ))}
  </div>
</div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
            <div className="flex w-[24%] flex-col gap-5 md:w-full">
              <div className="flex w-[82%] flex-col gap-3 md:w-full">
                <div className="flex flex-wrap justify-between gap-5">
                  <button onClick={handleSideBar} >
                  <Heading
                    size="md"
                    as="h2"
                    className={`self-start !font-semibold tracking-[-0.50px] ${navigateSidebar ===1  ? "!text-blue_gray-900 font-bold" : "!text-black-900_99" } `}
                    id="1"
                  >
                    New Released
                  </Heading>
                  </button>
                  <button onClick={handleSideBar} >
                  <Heading
                   size="md" 
                   as="h3"
                    className={`!font-semibold tracking-[-0.50px] ${navigateSidebar ===2  ? "!text-blue_gray-900 font-bold" : "!text-black-900_99" }`}  id="2">
                   Life 
                  </Heading>
                  </button>
                  <button onClick={handleSideBar} >
                  <Heading 
                  size="md"
                   as="h3" 
                   className={`self-end !font-semibold tracking-[-0.50px] ${navigateSidebar ===3  ? "!text-blue_gray-900 font-bold" : "!text-black-900_99" }`} id="3">
                    Entertainment 
                  </Heading>
                  </button>
                </div>
                <Img src="images/img_group_48095637.svg" alt="image" className="h-px w-[38%]" />
              </div>
              <div className="flex flex-col gap-[19px]">
                {sideBarPosts.slice(0,6).map((d, index) => (
                  <AllBlogCardnews1 {...d} key={"allblog" + index} />
                ))}
              </div>
            </div>
          </div>
          <Footer className="mt-[120px]" />
        </div>
      </div>
    </>
  );
}
