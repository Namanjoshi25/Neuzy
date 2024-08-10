import React from "react";

const sizes = {
  "3xl": "text-4xl font-semibold md:text-[34px] sm:text-[32px]",
  "2xl": "text-2xl font-semibold md:text-[22px]",
  xl: "text-xl font-semibold",
  "4xl": "text-5xl font-semibold md:text-[44px] sm:text-[38px]",
  s: "text-xs font-semibold",
  md: "text-sm font-bold",
  xs: "text-[10px] font-semibold",
  lg: "text-lg font-semibold",
};

const Heading = ({ children, className = "", size = "lg", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={` font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
