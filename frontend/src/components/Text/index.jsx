import React from "react";

const sizes = {
  xs: "text-[10px] font-normal",
  s: "text-xs font-normal",
  "3xl" : "text-lg font-normal",
  xl: "text-base font-normal",
  md: "text-sm font-normal",
};

const Text = ({ children, className = "", as, size = "s", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-white-A700 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
