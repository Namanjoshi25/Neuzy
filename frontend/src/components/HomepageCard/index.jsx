import React from "react";
import { RatingBar, Text, Heading, Img } from "./..";

export default function HomepageCard({
  image = "images/img_rectangle_17.png",
  title = "Avengers Age of Ultron",
  genres = "Genres : Action Adventure Sci-Fi",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center justify-between w-full pb-[22px] bg-white-A700 rounded-[10px]`}
    >
      <Img src={image} alt="image" className="h-[307px] w-full rounded-[10px] object-cover md:h-auto" />
      <div className="flex w-[65%] flex-col items-center gap-[11px]">
        <Heading as="h6" className="tracking-[-0.50px]">
          {title}
        </Heading>
        <Text size="md" as="p" className="tracking-[-0.50px] !text-black-900_7f">
          {genres}
        </Text>
        <RatingBar
          value={4}
          isEditable={true}
          color="#d1d4d8"
          activeColor="#ffe174"
          size={20}
          className="flex justify-between"
        />
      </div>
    </div>
  );
}
