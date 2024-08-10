import React from "react";
import { Button, Img, Text, Heading, Input } from "./..";

export default function LoginContent({
  datetext = "Ukraine, 24 april 2022",
  headlinetext = "Zelensky accuses Russia of worst crimes since WW2 ",
  descriptiontext = "The Ukrainian leader says Russia must face an international trial as he calls for the country to be thrown off the UN Security Council. Lorem ipsom dolor",
  readMore = "Read More",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col items-start w-full gap-4`}>
      <div className="relative h-[181px] self-stretch md:h-auto">
        <Img src="images/img_unsplash_376kn_isple_246x418.png" alt="image" className="h-[181px] w-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full flex-col items-start justify-center gap-[109px] bg-gradient p-[13px] md:gap-[81px] sm:gap-[54px]">
          <Input
            shape="square"
            name="tag_one"
            placeholder={`Entertaiment `}
            className="w-[36%] self-end font-bold tracking-[-0.50px] sm:px-5"
          />
          <Heading size="xs" as="p" className="mb-1 tracking-[-0.50px] !text-white-A700">
            {datetext}
          </Heading>
        </div>
      </div>
      <div className="flex flex-col gap-[13px] self-stretch">
        <Heading size="md" as="p" className="!font-semibold leading-4 tracking-[-0.50px]">
          {headlinetext}
        </Heading>
        <Text size="xs" as="p" className="!font-poppins leading-[25px] tracking-[-0.50px] !text-black-900_7f">
          {descriptiontext}
        </Text>
      </div>
      <Button
        size="lg"
        shape="round"
        rightIcon={
          <Img
            src="images/img_akariconsarrowupright.svg"
            alt="akar-icons:arrow-up-right"
            className="h-[15px] w-[15px]"
          />
        }
        className="min-w-[138px] gap-[5px] tracking-[-0.50px] sm:px-5"
      >
        {readMore}
      </Button>
    </div>
  );
}
