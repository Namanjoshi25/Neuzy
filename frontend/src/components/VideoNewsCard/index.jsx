import React from "react";
import { Button, Img, Text, Heading } from "./..";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getCategoryClass } from "utils/categoryColor.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";


export default function VideoNewsCard({
  
  ...props
}) {
  
 
  return (
    <Link to={`/singleBlog/${props._id}`}>
    <div {...props} className={`${props.className} flex flex-col shadow-md h-[350px]  w-[350px] gap-[21px]`}>
          
      <div className="relative h-1/2 md:h-auto">
        <Img src={props.news.thumbnail} alt="image" className=" h-full w-full object-cover" />
         <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex  h-full w-full flex-col items-start gap-[168px] bg-gradient p-3.5 md:gap-[126px] sm:gap-[84px]">
          <Text className={` p-1 tracking-[-0.50px] ${getCategoryClass(props.news.category)} `}>
          {props.news.category}
         
          </Text>
          
      
        </div>
      </div>
      <div className="flex flex-col items-start  h-1/2 justify-between gap-5 ">
        <div className="flex ml-2   flex-col">
          <Heading as="h6" className="leading-[21px] tracking-[-0.50px] mb-2 overflow-hidden">
            {props.news.title}
          </Heading>
       {/*    <Text as="p" className="!font-poppins leading-[25px] tracking-[-0.50px] !text-black-900_7f">
            {props.news.description}
          </Text> */}
        </div>
        <div className=" mb-3 ml-3">
          {props.isAuthor 
          ?
          <div className='flex items-end mr-5'>
          <button  onClick={(e)=>props.handleDelete(props.news._id)} className=' ml-2 hover:text-red-500 transition-transform  ease-in-out'>  <FontAwesomeIcon size="lg" icon={faTrash} /> </button>
          <Link to={`/author/update-video/${props.news._id}`}>
          <button className='ml-2 hover:text-green-500'>  <FontAwesomeIcon size='lg' icon={faEdit} /> </button>
          </Link>
        </div>
          :
          

        <Link to={`/news/singleVideo/${props.news._id}`}>
        Explore
        </Link>
}
        </div>
          
        
         
        
      </div>
    
    </div>
    </Link>
  );
}
