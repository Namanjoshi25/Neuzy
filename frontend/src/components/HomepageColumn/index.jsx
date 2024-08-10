import React from "react";
import { Button, Img, Text, Heading, Input } from "./..";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function HomepageColumn({
  
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col  w-full gap-[21px]`}>
      <div className="relative h-[246px] self-stretch md:h-auto">
        <Img src={props.news.images[0]} alt="image" className="h-[246px] w-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full flex-col items-start justify-end gap-[163px] bg-gradient p-[17px] md:gap-[122px] sm:gap-[81px]">
          <Input
            shape="square"
            name="tag_one"
            placeholder={`Entertaiment `}
            className="mr-1.5 mt-1.5 w-[29%] self-end font-bold tracking-[0.12px] md:mr-0"
          />
          <Text as="p" className="tracking-[-0.50px]">
           {props.news.location}, {format(new Date(props.news.createdAt),"dd MMMM yy")}
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between h-full gap-5 self-stretch">
        <div className="self-stretch">
          <Heading as="h6" className="leading-[21px] tracking-[-0.50px]">
            {props.news.title}
          </Heading>
          <Text as="p" className="!font-poppins leading-[25px] tracking-[-0.50px] !text-black-900_7f">
            {props.news.summary}
          </Text>
        </div>
        <Link to={`/singleBlog/${props._id}`}>
        Read More
     
        </Link>
        
      </div>
    </div>
  );
}
