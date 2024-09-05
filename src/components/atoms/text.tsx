import React, { FC, HTMLAttributes, createElement } from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const H: FC<HeadingProps> = ({ level = 2, className, ...rest }) => {
  return createElement(
    `h${level}`,
    {
      className: cn(
        "font-sans font-bold antialiased tracking-[-2%] leading-[42px]",
        className
      ),
      ...rest
    }
  );
};

export const P: FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, ...rest }) => (
  <p
    className={cn(
      "font-sans antialiased text-base font-medium",
      className
    )}
    {...rest}
  />
);