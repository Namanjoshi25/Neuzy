import React from "react";
import { Text, Heading, Img } from "./..";
import { format } from 'date-fns';
import { timeAgo } from "utils/time.util";
export default function HomepageRowhowtomaximiz({
  userimage = "images/img_rectangle_1479.png",
  titletext = "How to maximize investment with mutual funds",
  datetext = "Indonesia,  22 Agust 2022 ",
  timetext = "- 15 minutes ago",
  ...props
}) {
 const timeText = timeAgo(props.news.createdAt)
  return (
    <div {...props} className={`${props.className}  flex sm:flex-col items-center w-full gap-2.5`}>
      <Img src={props.news.images[0]} alt="image" className="h-[84px] w-[84px] object-cover sm:w-full" />
      <div className="flex flex-1 flex-col items-start gap-[26px] sm:self-stretch">
        <Heading as="h6" className="!font-bold leading-[21px] tracking-[-0.50px]">
          {props.news.title}
        </Heading>
        <div className="flex flex-wrap gap-[7px]">
          <Heading size="s" as="p" className="tracking-[-0.50px]">
           <span>{props.news.location} ,</span> {format(new Date(props.news.createdAt), 'dd MMMM yyyy')}
          </Heading>
          <Text as="p" className="tracking-[-0.50px] !text-black-900_7f">
            {timeText}
          </Text>
        </div>
      </div>
    </div>
  );
}
