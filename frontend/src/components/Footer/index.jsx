import React from "react";
import { Img, Text, Heading } from "./..";

export default function Footer({ ...props }) {
  return (
    <footer {...props} className={`${props.className} self-stretch`}>
      <div className="flex w-full justify-center bg-black-900 py-[60px] md:py-5">
        <div className="container-sm flex flex-col gap-[52px] md:p-5 sm:gap-[26px]">
          <div className="flex items-start justify-between gap-5 md:flex-col">
            <div className="flex w-[50%] flex-col gap-[19px] md:w-full">
              <Img src="/images/img_footer_logo.png" alt="footerlogo" className="h-[30px] w-[72px] object-contain" />
              <Text size="md" as="p" className="leading-[35px] tracking-[-0.50px]">
              Neuzy brings you the latest news with in-depth analysis, keeping you informed and engaged with the stories that shape our world. From breaking headlines to insightful features, we deliver the truth with clarity and impact.
              </Text>
            </div>
           </div>
          <div className="flex flex-col gap-[29px]">
            <div className="h-px bg-white-A700" />
            <div className="flex flex-wrap items-center self-start md:flex-col">
              <Text size="md" as="p" className="self-end tracking-[-0.50px]">
                Copyright © All Rights Reserved
              </Text>
              <div className=" sm: flex gap-4 mt-2">
              <Img src="/images/img_frame.svg" alt="image" className="ml-[980px] h-[24px] w-[24px] md:ml-0 md:w-full" />
              <Img
                src="/images/img_frame_white_a700.svg"
                alt="image"
                className="ml-5 h-[24px] w-[24px] md:ml-0 md:w-full"
              />
              <Img
                src="/images/img_frame_white_a700_24x24.svg"
                alt="image"
                className="ml-5 h-[24px] w-[24px] md:ml-0 md:w-full"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
