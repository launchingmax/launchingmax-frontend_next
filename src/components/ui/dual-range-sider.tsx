"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface DualRangeSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: "top" | "bottom";
  label?: (value: number | undefined) => React.ReactNode;
}

const DualRangeSlider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, DualRangeSliderProps>(
  ({ className, label, labelPosition = "bottom", ...props }, ref) => {
    const initialValue = Array.isArray(props.value) ? props.value : [props.min, props.max];

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-launchingGray-1.5">
          <SliderPrimitive.Range className="absolute h-full bg-launchingBlue-1.5" />
        </SliderPrimitive.Track>
        {initialValue.map((value, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full  bg-launchingBlue-5 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              {/* {label && (
                <span
                  className={cn(
                    "absolute flex w-full justify-center text-launchingBlue-6 font-bold text-text-md",
                    labelPosition === "top" && "-top-7",
                    labelPosition === "bottom" && "top-4"
                  )}
                >
                  {label(value)}
                </span>
              )} */}
            </SliderPrimitive.Thumb>
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  }
);
DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
