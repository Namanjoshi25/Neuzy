import React from "react";
import { Text, Heading, Img } from "./..";
import { format } from "date-fns";
import { timeAgo } from "utils/time.util";
import { Link } from "react-router-dom";
export default function AllBlogCardnews1({
  userimage = "images/img_unsplash_g0gb14lmsjk.png",
  matchresult = "Miami Dolphins won the match and officially qualified for the final",
  date = "New York,  22 Agust 2022 ",
  timeago = "- 10 minutes ago",
  ...props
}) {
  return (
    <Link to={`/singleBlog/${props._id}`}>
    <div {...props} className={`${props.className} flex items-center gap-2.5 flex-1`}>
    
      <Img src={props.news.images[0]} alt="image" className="h-[65px] w-[65px] object-cover" />
      <div className="flex flex-1 flex-col gap-3">
        
        <Heading size="md" as="p" className="!font-poppins leading-[21px] tracking-[-0.50px]">
          {props.news.title}
        </Heading>
        <div className="flex flex-wrap gap-[5px]">
          <Heading size="xs" as="p" className="tracking-[-0.50px]">
            {format(new Date(props.news.createdAt) , "dd MMMM yy")}
          </Heading>
          <Text size="xs" as="p" className="tracking-[-0.50px] !text-black-900_7f">
            {timeAgo(props.news.createdAt)}
          </Text>
        </div>
      </div>
    
    </div>
    </Link>
  );
}
