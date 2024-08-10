import authorAxiosInstance from 'axios/authorAxios.config';
import { Heading } from 'components'
import AuthorNewsListCard from 'components/AuthorNewsListCard';
import SideBarNavbar from 'components/SideBarNavbar'
import { func } from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast, ToastContainer ,Slide } from 'react-toastify';
import Pagination from 'components/PageChanger';
function index() {
    
    const [news, setNews] = useState([]);
    const author = useSelector(state => state.author.author)

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const totalPages = Math.ceil((news?.length)/postsPerPage);

   const indexOfLastPost = Math.min(currentPage * postsPerPage, news.length);
  const indexOfFirstPost = (currentPage - 1) * postsPerPage;
  const currentNews = news.slice(indexOfFirstPost, indexOfLastPost); 

    useEffect(()=>{
        async function fetchAuthorNews(){
            const res=  await authorAxiosInstance.get(`/news/${author._id}`)
            setNews(res.data.data)

        }
        fetchAuthorNews()
    })

    const handlePageChange =(page)=>{
        setCurrentPage(page)
    }
  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar transition={Slide} />
    <div className=' container flex h-screen overflow-hidden'>
        <SideBarNavbar/>
        <div className=' flex-1 mt-4 items-center h-full  w-full justify-center'>
        <Heading size='3xl' className='text-center mb-2'>My News </Heading>
        <div className=' mt-2 h-[1px] w-full  bg-black-900_4c'/>
      <div className=' h-full flex flex-col'>
      <div className=' w-full flex flex-col justify-center items-center'>
            {currentNews.slice(0,5).map((d,index)=>(
                <AuthorNewsListCard {...d} key ={"AuthorAllNews" + index }/>
            ))}


        </div>
        <div className=' items-end'>
       <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
       </div>
      </div>
       
      
        </div>
        
    </div>
    </>
  )
}

export default index