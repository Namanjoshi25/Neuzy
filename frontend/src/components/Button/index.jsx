import React from "react";
import PropTypes from "prop-types";

const shapes = {
  circle: "rounded-[50%]",
  square: "rounded-[0px]",
  round: "rounded-lg",
};
const variants = {
  fill: {
    deep_orange_A400: "bg-deep_orange-A400 text-white-A700",
    white_A700: "bg-white-A700",
    green_700: "bg-green-700 text-white-A700",
    purple_500: "bg-purple-500 text-white-A700",
    gray_100: "bg-gray-100 text-black-900",
    orange_A700: "bg-orange-A700 text-white-A700",
    red_900: "bg-red-900 text-white-A700",
    gray_50: "bg-gray-50 text-black-900",
    blue_gray_900: "bg-blue_gray-900 text-white-A700",
    black_900: "bg-black-900 text-white-A700",
  },
  outline: {
    white_A700: "border-white-A700 border-2 border-solid",
  },
};
const sizes = {
  sm: "h-[17px] text-sm",
  "9xl": "h-[80px] px-4 text-lg",
  xl: "h-[35px] px-[7px]",
  "5xl": "h-[44px] px-[30px] text-lg",
  "8xl": "h-[60px] px-[15px]",
  "7xl": "h-[56px] px-[35px] text-base",
  "6xl": "h-[52px] px-[35px] text-lg",
  lg: "h-[35px] px-[30px] text-xs",
  md: "h-[25px] px-[15px] text-xs",
  "3xl": "h-[40px] px-[35px] text-sm",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "3xl",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["circle", "square", "round"]),
  size: PropTypes.oneOf(["sm", "9xl", "xl", "5xl", "8xl", "7xl", "6xl", "lg", "md", "3xl"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf([
    "deep_orange_A400",
    "white_A700",
    "green_700",
    "purple_500",
    "gray_100",
    "orange_A700",
    "red_900",
    "gray_50",
    "blue_gray_900",
    "black_900",
  ]),
};

export { Button };
