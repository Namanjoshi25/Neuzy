import authorAxiosInstance from 'axios/authorAxios.config'
import { Heading } from 'components'
import Pagination from 'components/PageChanger'
import SideBarNavbar from 'components/SideBarNavbar'
import VideoNewsCard from 'components/VideoNewsCard'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast, ToastContainer ,Slide } from 'react-toastify';

function index() {
    const author = useSelector(state => state.author.author)
    const [videos, setVideos] = useState([]);
    console.log(author);
    
    useEffect(()=>{
        const fetchVideos = async ()=>{

            const res = await authorAxiosInstance.get(`/video/get-videos-by-author/${author._id}`)
           setVideos(res.data.data)

        }
        fetchVideos();
    },[])
    const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(videos?.length / postsPerPage);

  //calculate the post as per the pages
  const indexOfLastPost = Math.min(currentPage * postsPerPage, videos.length);
  const indexOfFirstPost = (currentPage - 1) * postsPerPage;
  const currentPosts = videos.slice(indexOfFirstPost, indexOfLastPost);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const handleDelete = async(id)=>{
    const res= await authorAxiosInstance.delete(`/video/delete-video/${id}`)

    setVideos(videos.filter(video => video._id !== id));



    if(!res) toast.error("Failed to delete the video")
        else  toast.success("Video Delete successfully")

  }
  return (
    <div className=' w-full h-screen flex '>
               <ToastContainer position="top-right" autoClose={5000} hideProgressBar transition={Slide} />

        <SideBarNavbar className=" h-screen"/>
        <div className=' flex-1 flex flex-col items-center'>
            <div className=' mt-3 '>
                <Heading size='3xl'>Quick Videos</Heading>
                
            </div>
            <div className=' w-full h-px bg-black-900_7f rounded-full mt-2' />
            <div className=' flex gap-10 mt-4'>
                {currentPosts.slice(0,3).map((video,index)=>(
                    <VideoNewsCard className=" w-1/3" handleDelete = {handleDelete} isAuthor={true} news={video} key={"AuthorVideoCard" + index} />
                ))}

            </div>
            <div className=' flex gap-10 mt-4'>
                {currentPosts.slice(3,6).map((video,index)=>(
                    <VideoNewsCard className=" w-1/3" handleDelete ={handleDelete} isAuthor={true} news={video} key={"AuthorVideoCard" + index} />
                ))}

            </div>
            {videos.length > 0 && 
            <Pagination
         totalPages={totalPages}
         currentPage={currentPage}
         onPageChange={onPageChange}
       />
            }
       
        </div>

    </div>
  )
}

export default index