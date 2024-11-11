"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

const FloatingButton = () => {
  return (
    <div className="fixed bottom-12 right-12 z-50">
      <Button
        className=" rounded-md w-max bg-launchingBlue-4 p-2 space-x-1"
        onClick={() => console.log(console.log("Float Button has been clicked . . . !"))}
      >
        <div className="relative">
          <div className="absolute bg-red-500 w-2 h-2 rounded-full top-[0.5px] -right-[2px] outline outline-launchingBlue-4 "></div>
          <Icon icon="solar:letter-bold-duotone" className="text-text-xl" />
        </div>
        <span className="text-fg-white text-text-sm font-semibold">Messages</span>
      </Button>
    </div>
  );
};

export default FloatingButton;
