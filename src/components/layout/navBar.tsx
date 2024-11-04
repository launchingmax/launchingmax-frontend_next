"use client";

import ThemeToggler from "../molecules/ThemeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Music from "../organisms/Music";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGlobal } from "@/contexts/GlobalLayout";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const NavBar = () => {
  const { userDetail } = useGlobal();

  return (
    <div className="sticky top-0 flex justify-between items-center bg-primary-alt md:rounded-xl py-4 px-6 md:py-2 md:px-3">
      <div className="flex items-center overflow-hidden w-full">
        <div className="relative">
          <div className="absolute right-0 bottom-0 z-20 w-3 h-3 bg-green-400 rounded-full border-[2px] border-brand-alt"></div>

          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={`${process.env.NEXT_PUBLIC_ALL_API}${userDetail?.user.profile}`} />
                <AvatarFallback className="bg-primary-4 text-launchingGray-1 dark:text-launchingGray-2">
                  {userDetail?.user.firstName.charAt(0)}
                  {userDetail?.user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white dark:bg-launchingBlue-8.5">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                </div>
                <div className="grid gap-2"></div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col pl-2 pr-5 tracking-[0.125rem] text-launchingBlack dark:text-white">
          <h1 className="text-sm font-semibold leading-6">
            Hello, <span className="capitalize">{userDetail?.user.firstName}</span>
            ...!
          </h1>
          <h1 className="text-xs font-medium leading-4 tracking-[0.125rem] text-launchingGray-5 dark:text-launchingGray-2">
            {userDetail?.user.type}
          </h1>
        </div>
        <Icon icon="solar:refresh-bold-duotone" className="text-mauve-5 text-2xl cursor-pointer " />
      </div>

      <div className="absolute hidden md:flex justify-center gap-4 items-center  right-1 bg-white dark:bg-launchingBlue-8.5">
        <ThemeToggler />

        <Icon icon="solar:bell-bold-duotone" className="text-2xl text-primary cursor-pointer" />
        <Music />
      </div>
    </div>
  );
};

export default NavBar;
