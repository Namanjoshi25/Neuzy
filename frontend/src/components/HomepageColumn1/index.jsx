import React from "react";
import { Button, Img, Text, Heading } from "./..";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getCategoryClass } from "utils/categoryColor.util";

export default function HomepageColumn1({
  
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col  w-full gap-[21px]`}>
      <div className="relative h-[247px] self-stretch md:h-auto">
        <Img src={props.news.images[0]} alt="image" className="h-[247px] w-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full flex-col items-start gap-[168px] bg-gradient p-3.5 md:gap-[126px] sm:gap-[84px]">
          <Text className={` p-1 tracking-[-0.50px] ${getCategoryClass(props.news.category)} `}>
          {props.news.category}
         
          </Text>
          
          <Text as="p" className="tracking-[-0.50px]">
            {props.news.location}, {format(new Date(props.news.createdAt),"dd MMMM yy")}
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-start  h-full justify-between gap-5 self-stretch">
        <div className="self-stretch flex  flex-col">
          <Heading as="h6" className="leading-[21px] tracking-[-0.50px] mb-2">
            {props.news.title}
          </Heading>
          <Text as="p" className="!font-poppins leading-[25px] tracking-[-0.50px] !text-black-900_7f">
            {props.news.summary}
          </Text>
        </div>
        <div>
        <Link to={`/singleBlog/${props._id}`}>
        Read More
        </Link>
        </div>
        
         
        
      </div>
    </div>
  );
}
