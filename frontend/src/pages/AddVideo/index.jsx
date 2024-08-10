import authorAxiosInstance from 'axios/authorAxios.config';
import { Heading, Input } from 'components'
import SideBarNavbar from 'components/SideBarNavbar'
import React, { useRef ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer ,Slide } from 'react-toastify';
function index() {
  
   
  
    const titleRef = useRef()
    const descriptionRef=useRef()
    const thumbnailRef=useRef()
    const summaryRef = useRef()
    const videoRef = useRef()
    const categoryRef= useRef()
    const navigate= useNavigate()
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
   
      const thumbnail = thumbnailRef.current.files[0];
      const video = videoRef.current.files[0]
      const category = categoryRef.current.value

     console.log(video);

    
   

      if(!title || !description || !category || thumbnail.length===0 || video.length ===0) {
        toast.error("All fields are required")
        return
      }
   
    
       const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('videoFile', video);
      formData.append('thumbnail', thumbnail);
      formData.append('category',category)

     

      const res = await authorAxiosInstance.post('/video/add-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(res) {
        toast.success("News added successfully")
        navigate("/author/quick-video")
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
      <Heading size='3xl' className='text-center'>Add Video</Heading>
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
      <div className="space-y-2">
        <label className="block font-semibold">Thumbnail</label>
        <Input
          type="file"
          accept="image/*"
        
          ref={thumbnailRef}
          className="!w-full !border-2 !p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
        />
      </div>
      <div className="space-y-2">
        <label className="block font-semibold">Video</label>
        <Input
          type="file"
          accept="video/*" 
          
          ref={videoRef}
          className="!w-full !border-2 !p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
        />
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
        Add Video
      </button>
      </div>
    </form>
    </div>
    </main>
  </div></>
  )
}

export default index