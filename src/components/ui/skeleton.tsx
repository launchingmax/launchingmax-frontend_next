import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate-pulse rounded-md bg-launchingBlue-05 dark:bg-launchingBlue-6", className)} {...props} />
  );
}

export { Skeleton };
