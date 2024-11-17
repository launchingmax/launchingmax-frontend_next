"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon, DotFilledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: {
    container: "w-[1rem] h-[1rem]",
    roundedIcon: "w-[0.375rem] h-[0.375rem]",
    padding: "0.125rem",
    iconStyle: { height: 3, width: 3 },
  },
  md: {
    container: "w-[1.25rem] h-[1.25rem]",
    roundedIcon: "w-[0.5rem] h-[0.5rem]",
    padding: "0.1875rem",
    iconStyle: { height: 5, width: 5 },
  },
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    size?: "sm" | "md";
    icon?: React.ReactNode;
    shape?: "square" | "circle";
    title?: string;
    desc?: string;
    onChange?: (e: any) => void;
    value?: any;
  }
>(
  (
    {
      className,
      size = "sm",
      //icon = <CheckIcon />,
      shape = "square",
      title,
      desc,
      ...props
    },
    ref
  ) => {
    const { container, roundedIcon, padding, iconStyle } = sizeClasses[size];

    return (
      <div className="flex justify-center items-start space-x-md">
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            `${container} ${shape == "square" ? "rounded-xs" : "rounded-full"} ${padding}`,
            "group peer shrink-0 bg-primary shadow mt-xxs flex justify-center items-center",
            "aspect-square h-6 w-6 text-launchingBlue-5 dark:text-launchingGray-3 font-extrabold rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 shadow focus:border-launchingBlue-3 focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",

            "disabled:cursor-not-allowed disabled:data-[state=checked]:bg-disabled disabled:data-[state=checked]:text-fg-disabled-subtle disabled:data-[state=unchecked]:bg-disabled disabled:border-disabled-subtle",
            "disabled:data-[state=indeterminate]:bg-disabled disabled:data-[state=indeterminate]:text-fg-disabled-subtle",
            className
          )}
          {...props}
          onCheckedChange={props.onCheckedChange ?? props.onChange}
          checked={props.checked ?? props.value}
        >
          <CheckboxPrimitive.CheckboxIndicator className={cn("flex items-center justify-center text-current")}>
            {shape == "circle" ? (
              <DotFilledIcon />
            ) : (
              <>
                <CheckIcon className={`text-text-xl hidden group-data-[state=checked]:block`} />
                <MinusIcon className={`text-text-xl hidden group-data-[state=indeterminate]:block`} />
              </>
            )}
          </CheckboxPrimitive.CheckboxIndicator>
        </CheckboxPrimitive.Root>

        <div className="">
          <p className="text-md font-medium text-secondary">{title}</p>
          <p className="text-md font-regular text-tertiary">{desc}</p>
        </div>
      </div>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
