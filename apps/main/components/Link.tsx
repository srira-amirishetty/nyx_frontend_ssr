import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import Link, { type LinkProps } from "next/link";

const anchor = cva("nyx-a", {
  variants: {
    intent: {
      primary: [
        "border",
        "border-amber-400",
        "text-white",
        "hover:text-black",
        "hover:bg-amber-300"
      ],
      secondary: [
        "text-black",
        "border",
        "border-black",
        "hover:bg-black",
        "hover:text-white"
      ],
    },
    size: {
      small: ["text-sm", "font-light", "px-2", "py-1"],
      normal: ["text-base", "font-normal", "px-5", "py-2"],
      medium: ["text-lg", "font-medium", "px-5", "py-2"],
    },
    rounded: {
      normal: ["rounded-md"]
    }
  },
  compoundVariants: [{ intent: ["primary", "secondary"], size: ["small", "normal", "medium"], rounded: ["normal"], class: "text-center" }],
  defaultVariants: {
    intent: "primary",
    size: "normal",
    rounded: "normal"
  },
});

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof anchor> { }

const CustomLink: React.FC<AnchorProps & LinkProps> = ({
  className,
  intent,
  size,
  rounded,
  children,
  ...props
}) => <Link className={twMerge(anchor({ intent, size, rounded, className }))} {...props}>{children}</Link>;

export default CustomLink;