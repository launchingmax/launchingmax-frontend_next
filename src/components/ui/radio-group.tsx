"use client";

import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    value?: any;
    onChange?: (e: any) => void;
  }
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        "grid gap-2  text-text-sm font-regular leading-5 text-launchingGray-6 dark:text-fg-white",
        className
      )}
      {...props}
      onValueChange={props.onValueChange ?? props.onChange}
      value={props.value}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-6 w-6 text-text-xl text-launchingBlue-5 dark:text-launchingGray-3 font-extrabold rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 shadow focus:border-launchingBlue-3 focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="h-5 w-5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
