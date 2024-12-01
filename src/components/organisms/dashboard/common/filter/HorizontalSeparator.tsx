import { Separator } from "@/components/ui/separator";

export default function HorizontalSeparator() {
  return (
    <Separator
      orientation="horizontal"
      className="w-full h-[0.09rem] bg-gradient-to-r
from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded"
    />
  );
}
