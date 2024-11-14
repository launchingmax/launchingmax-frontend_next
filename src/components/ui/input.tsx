import * as React from "react";

import { cn } from "@/lib/utils";
import { InputClasses } from "@/lib/styles/common";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Leading?: React.ReactNode;
  Trailing?: React.ReactNode;
  inputSize?: "sm" | "md";
  useLeadingDivider?: boolean;
  useTrailingDivider?: boolean;
  label?: string;
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
      label,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          `flex flex-col h-14 rounded-md py-2 px-4 hover:cursor-pointer bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 focus:border-launchingBlue-3 focus:ring-1  ${
            props.disabled && "opacity-50 cursor-not-allowed text-disabled"
          }`,
          InputClasses.size[inputSize].px,
          className
        )}
      >
        <label className="text-text-xs font-regular text-launchingBlack dark:text-fg-white">{label}</label>
        <div className="flex items-center space-x-md">
          {Leading}
          <input
            type={type}
            className={cn(
              "flex w-full bg-transparent text-text-md font-regular  file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-500 dark:placeholder:text-fg-white focus-visible:outline-none disabled:cursor-not-allowed",
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
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
