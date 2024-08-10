
import authorAxiosInstance from 'axios/authorAxios.config';
import { Heading, Input } from 'components'
import SideBarNavbar from 'components/SideBarNavbar'
import React, { useEffect, useRef ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer ,Slide } from 'react-toastify';
  

function index() {

  
  const navigate= useNavigate()
  const params = useParams()
  const newsId = params.id
  const titleRef = useRef()
  const contentRef=useRef()
  const imagesRef=useRef()
  const summaryRef = useRef()
  const locationRef = useRef()
  const categoryRef= useRef()


  useEffect(() => {
    
    async function fetchNewsData (){ 
      const res = await authorAxiosInstance.get(`/news/get-news-by-id/${newsId}`)
      titleRef.current.value = res.data.data.title
      contentRef.current.value = res.data.data.content
      summaryRef.current.value = res.data.data.summary
      locationRef.current.value = res.data.data.location
      categoryRef.current.value = res.data.data.category
      imagesRef.current.files = res.data.data.images
   
          
     }
     fetchNewsData()
  }, []); 
    
 
  

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

    if(!title || !content || !summary || 
      images.length===0 ) {
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

    imagesArray.forEach((image, index) => {
      formData.append(`images`, image);
    }); 
 

    const res = await authorAxiosInstance.patch(`/news/update-news/${newsId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if(res) {
      toast.success("News updated successfully")
      navigate("/author")
    }else{
      toast.error("Failed to update the news")
    }
    
 
  }
  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar transition={Slide} />

<div className="flex overflow-y-auto min-h-screen">
 <SideBarNavbar  />
 <main className="flex-1  flex-col items-center justify-center p-6">
 <Heading size='3xl' className=' mt-2 text-center'>Update News :</Heading>
 <div className=' h-px w-full bg-black-900_7f my-2'/>
 <div className=' flex flex-col items-center justify-center w-full'>
   <form  onSubmit={handleSubmit}  className=" w-full shadow-md mt-2 shadow-black-900_4c  p-6 space-y-4">
  
   <div className="space-y-2">
     <label className="block font-semibold">Title</label>
     <Input
       type="text"
       
      
       className="w-full p-2 border !border-black-900_4c rounded"
       required
       ref={titleRef}
     />
   </div>
   <div className="space-y-2">
     <label className="block font-semibold">Category</label>
     <Input
       type="text"
       
      
       className="w-full p-2 border !border-black-900_4c rounded"
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
       className="w-full p-2 border !border-black-900_4c rounded"
     />
   </div>
   <div className="space-y-2">
     <label className="block font-semibold">Location</label>
     <Input
       type="text"
       required
       ref={locationRef}
       className="w-full p-2 border !border-black-900_4c rounded"
     />
   </div>
   <div className="space-y-2">
     <label className="block font-semibold">Content</label>
     <textarea
      type="text"
       ref={contentRef}
       rows="4"
       className="w-full p-2 !border-2  !border-black-900_4c !rounded"
       required
     ></textarea>
   </div>
   <div className="space-y-2">
     <label className="block font-semibold">Summary</label>
     <textarea
       type='text'
       ref={summaryRef}
       rows="2"
       className="w-full p-2 !border-2  !border-black-900_4c !rounded"
       required
     ></textarea>
   </div>
   <button
     type="submit"
     className="bg-blue-500  text-white-A700 p-2 rounded hover:bg-blue-700"
   >
     Submit
   </button>
 </form>
 </div>
 </main>
</div></>
  )
}

export default index