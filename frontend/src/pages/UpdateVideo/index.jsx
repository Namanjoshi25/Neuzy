import authorAxiosInstance from 'axios/authorAxios.config';
import { Heading, Input } from 'components'
import SideBarNavbar from 'components/SideBarNavbar'
import React, { useRef ,useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer ,Slide } from 'react-toastify';
function index() {
  const params = useParams()
  const videoId = params.id
  const titleRef = useRef()
    const descriptionRef=useRef()
    const thumbnailRef=useRef()
    const summaryRef = useRef()
    const videoRef = useRef()
    const categoryRef= useRef()
    const navigate= useNavigate()
    
  
  useEffect(() => {
    

    async function fetchVideoData (){ 
      const res = await authorAxiosInstance.get(`/video/get-video-by-id/${videoId}`)
      titleRef.current.value = res.data.data.title
      descriptionRef.current.value = res.data.data.description
     
      
      categoryRef.current.value = res.data.data.category

   
          
     }
     fetchVideoData()
  }, []); 
    
   
  
    
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
   
      

      const category = categoryRef.current.value



    
   

      /* if(!title || !description || !category || !thumbnail || !video) {
        toast.error("All fields are required")
        return
      } */
   
    

     

      const res = await authorAxiosInstance.put(`/video/update-video/${videoId}`, {title,description,category}, {
      
      });
      if(res) {
        toast.success("News Data Updated successfully")
        
      }else{
        toast.error("Failed to add the news")
      }
      
   
    }
    const handleThumbnailChange= async (e)=>{
      e.preventDefault();
      const thumbnail = thumbnailRef.current.files[0];
      const formData  = new FormData()

      formData.append('thumbnail', thumbnail);
      const res = await authorAxiosInstance.put(`/video/update-thumbnail/${videoId}` , formData ,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if(res) {
        toast.success("Thumbnail Updated successfully")
        
      }else{
        toast.error("Failed to add the news")
      }
    }
    const handleVideoChange= async (e)=>{
      e.preventDefault();
      const video = videoRef.current.files[0];
     
      const formData  = new FormData()

      formData.append('videoFile', video);
      const res = await authorAxiosInstance.put(`/video/update-videoFile/${videoId}` , formData ,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if(res) {
        toast.success("Video Updated successfully")
        
      }else{
        toast.error("Failed to add the news")
      }
    }
    
  return (
  <>
       <ToastContainer position="top-right" autoClose={5000} hideProgressBar transition={Slide} />
  
  <div className="flex  min-h-screen overflow-y-auto" >
    <SideBarNavbar  />
    <main className="flex-1 p-6 w-full">
      <div className='flex flex-col items-center w-full'>
      <form onSubmit={handleSubmit} className="shadow-md mt-2 shadow-black-900_4c p-6  space-y-3 w-3/4 ">
      <Heading size='3xl' className='text-center'>Update Video</Heading>
      <div className=' h-[1px] w-full bg-black-900_4c'/>

      <div className="space-y-2">
        <label className="block font-semibold">Title</label>
        <Input
          type="text"
          
         
          className="!w-full !border-2 p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
          required
          ref={titleRef}
        />
      </div>
      <div className="space-y-2">
        <label className="block font-semibold">Category</label>
        <Input
          type="text"
          
         
          className="!w-full !border-2 !p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
          required
          ref={categoryRef}
        />
      </div>
      <div className=" space-y-2">
        <label className="block font-semibold">Thumbnail</label>
        <div className=' flex justify-between items-center'>
        <Input
          type="file"
          accept="image/*"
        
          ref={thumbnailRef}
          className="!w-full  items-start !border-2 !p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
        />
       <button
        type="submit"
        onClick={handleThumbnailChange}
        className="bg-dark_blue text-white-A700 p-1 ml-2 rounded hover:bg-blue-700"
      >
        Update
      </button>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block font-semibold">Video</label>
        <div className=' flex justify-between items-center'>
        <Input
          type="file"
          accept="video/*" 
          
          ref={videoRef}
          className="!w-full !border-2 !p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
        />
        <button
        type="submit"
        onClick={handleVideoChange}
        className="bg-dark_blue text-white-A700 p-1 ml-2 rounded hover:bg-blue-700"
      >
        Update
      </button>
      </div>
      </div>
     
     
      <div className="space-y-2">
        <label className="block font-semibold">Description</label>
        <textarea
         type="text"
          ref={descriptionRef}
          rows="4"
          className="!w-full !border-2 !p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
          required
        ></textarea>
      </div>
      
      <div className=' flex items-center justify-center'>
      <button
        type="submit"
        className="bg-dark_blue text-white-A700 p-2 rounded hover:bg-blue-700"
      >
        Update Video
      </button>
      </div>
    </form>
    </div>
    </main>
  </div></>
  )
}

export default index