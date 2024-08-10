import React from "react";
import { Button, Img, Text, Heading, Input } from "./..";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getCategoryClass } from "utils/categoryColor.util";

export default function AllBlogCardnews({

  ...props
}) {
 
  return (
    <div {...props} className={`${props.className} flex flex-col items-start   pb-[23px] gap-4 sm:pb-5 overflow-hidden`}>
      <div className="relative h-[181px] self-stretch md:h-auto">
        <Img
          src={props.news.images[0]}
          alt="unsplash376kn"
          className="h-[181px] w-full object-cover "
        />
        <div className="absolute  bottom-0 left-0 right-0 top-0 m-auto flex  h-full w-full flex-col items-end justify-center gap-[109px] bg-gradient p-[13px] md:gap-[81px] sm:gap-[54px]">
          <Text  className={`${getCategoryClass(props.news.category)} p-1`}>
            {props.news.category}
          </Text>
          <Heading size="xs" as="p" className="mb-1 tracking-[-0.50px] !text-white-A700">
            {format(new Date(props.news.createdAt),"dd MMMM yy")}
          </Heading>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full gap-[13px] self-stretch">
        <div>
        <Heading size="md" as="p" className="!font-semibold leading-4  tracking-[-0.50px]">
          {props.news.title}
        </Heading>
        <Text size="xs" as="p" className="!font-poppins  mt-2 leading-[25px] tracking-[-0.50px] !text-black-900_7f">
          {props.news.summary}
        </Text>
        </div>
        <Link to={`/singleBlog/${props._id}`} >
      <p className=" text-sm">Read More</p>
      </Link>
      </div>
      
    </div>
  );
}
