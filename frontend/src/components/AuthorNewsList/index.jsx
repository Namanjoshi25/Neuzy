import React, { useEffect, useState } from 'react'
import { Text } from 'components'
import authorAxiosInstance from 'axios/authorAxios.config'
import { useSelector } from 'react-redux'
import AuthorNewsListCard from '../../components/AuthorNewsListCard'
import { toast, ToastContainer ,Slide } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom'
function AuthorNewsList() {

    const [AuthorNewsList, setAuthorNewsList] = useState([]);

    const authorState =useSelector(state=> state.author)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchAuthorNews = async ()=>{
              const res = await authorAxiosInstance.get(`/news/${authorState.author._id}`)
              setAuthorNewsList(res.data.data)
         }
        fetchAuthorNews()
    },[])

    const handleDelete = async(id)=>{
        if(!id) toast.error("Failed to delete the news")
  
            const res = await authorAxiosInstance.delete(`/news/delete-news/${id}`);
           if(res) {
                   setAuthorNewsList(prevList => prevList.filter(news => news._id !== id));
                toast.success("News deleted successfully");
           }else{
            toast.error("Failed to delete the News!")
           }
    }
  return (
    <>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar transition={Slide} />
    <div className=' w-full  h-5/6 '>
    <div className='  flex justify-between'>
    <h1 className=' ml-2 text-2xl mb-2 font-semibold'>Recent News</h1>
    <Link to={"/author/news"}>
    <p className=' underline-offset-1  font-semibold mr-2'>View All</p>

    </Link>
    </div>
      
        <div className='  h-[1px]   bg-black-900_7f w-full '></div>
        <div className='mt-2  flex flex-col w-full items-center'>
        {AuthorNewsList.length > 5 && AuthorNewsList.slice(0,5).map((data,index)=>(
            <AuthorNewsListCard handleDelete = {handleDelete}  {...data} key={"AuthorNewsListCar" + index}/ >
        ))}
         

        </div>

     
         
         </div>
         </>
  )
}

export default AuthorNewsList