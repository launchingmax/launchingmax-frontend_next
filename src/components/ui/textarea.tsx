import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] rounded-md px-3 py-2 bg-launchingBlue-05 dark:bg-launchingBlue-8.5 border border-launchingBlue-1 dark:border-launchingBlue-7 placeholder:text-gray-500 dark:placeholder:text-fg-white focus-visible:border-launchingBlue-3 focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
