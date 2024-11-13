import * as React from "react";

import { cn } from "@/lib/utils";
import { InputClasses } from "@/lib/styles/common";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Leading?: React.ReactNode;
  Trailing?: React.ReactNode;
  inputSize?: "sm" | "md";
  useLeadingDivider?: boolean;
  useTrailingDivider?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      Leading,
      useLeadingDivider = true,
      Trailing,
      useTrailingDivider = true,
      inputSize = "sm",
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          `flex items-center space-x-md h-12 rounded-md hover:cursor-pointer bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 focus:border-launchingBlue-3 focus:ring-1  ${
            props.disabled && "opacity-50 cursor-not-allowed text-disabled"
          }`,
          InputClasses.size[inputSize].px,
          className
        )}
      >
        {Leading}
        <input
          type={type}
          className={cn(
            "flex w-full bg-transparent text-md px-4  py-0.5 transition-colors  file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-500 dark:placeholder:text-fg-white focus-visible:outline-none disabled:cursor-not-allowed",
            className,
            // InputClasses.size[inputSize].py,
            useLeadingDivider && Leading ? `border-l border-l-gray-300 ` + InputClasses.size[inputSize].pl : "",
            useTrailingDivider && Trailing ? "border-r border-r-gray-300 " + InputClasses.size[inputSize].pr : ""
          )}
          ref={ref}
          {...props}
        />
        {Trailing}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
