import authorAxiosInstance from 'axios/authorAxios.config';
import { Heading, Input } from 'components'
import SideBarNavbar from 'components/SideBarNavbar'
import React, { useRef ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer ,Slide } from 'react-toastify';function index() {
  
   
  
    const titleRef = useRef()
    const contentRef=useRef()
    const imagesRef=useRef()
    const summaryRef = useRef()
    const locationRef = useRef()
    const categoryRef= useRef()
    const navigate= useNavigate()
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const title = titleRef.current.value;
      const content = contentRef.current.value;
      const summary = summaryRef.current.value;
      const images = imagesRef.current.files;
      const location = locationRef.current.value
      const category = categoryRef.current.value

     
    
      if(images.length >3) {
        toast.error("You can only upload 3 images")
        return
      }

      if(!title || !content || !summary || images.length===0) {
        toast.error("All fields are required")
        return
      }
      const imagesArray = Array.from(images);
    
       const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('summary', summary);
      formData.append('location', location);
      formData.append('category',category)

       console.log(imagesArray);
      imagesArray.forEach((image, index) => {
        formData.append(`images`, image);
      }); 
   

      const res = await authorAxiosInstance.post('/news/add-news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(res) {
        toast.success("News added successfully")
        navigate("/author")
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
      <Heading size='3xl' className='text-center'>Add News </Heading>
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
        <label className="block font-semibold">Images (up to 3)</label>
        <Input
          type="file"
          accept="image/*"
          multiple
          ref={imagesRef}
          className="!w-full !border-2 !p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
        />
      </div>
      <div className="space-y-2">
        <label className="block font-semibold">Location</label>
        <Input
          type="text"
          required
          ref={locationRef}
          className="!w-full !border-2 !p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
        />
      </div>
      <div className="space-y-2">
        <label className="block font-semibold">Content</label>
        <textarea
         type="text"
          ref={contentRef}
          rows="4"
          className="!w-full !border-2 !p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
          required
        ></textarea>
      </div>
      <div className="space-y-2">
        <label className="block font-semibold">Summary</label>
        <textarea
          type='text'
          ref={summaryRef}
          rows="2"
          className="!w-full !border-2 !p-4 !border-black-900_99 rounded-sm focus:ring-1  focus:outline-none focus:ring-black-900 text-ellipsis"
          required
        ></textarea>
      </div>
      <div className=' flex items-center justify-center'>
      <button
        type="submit"
        className="bg-dark_blue text-white-A700 p-2 rounded hover:bg-blue-700"
      >
        Add News
      </button>
      </div>
    </form>
    </div>
    </main>
  </div></>
  )
}

export default index