"use client";

import ThemeToggler from "../molecules/ThemeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Music from "../organisms/Music";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGlobal } from "@/contexts/GlobalLayout";

const NavBar = () => {
  const { userDetail } = useGlobal();

  return (
    <div className="sticky top-0 flex justify-between bg-primary-alt rounded-xl py-2 pr-2 pl-3">
      <div className="flex items-center ">
        <div className="relative">
          <div className="absolute right-0 bottom-0 z-20 w-3 h-3 bg-green-400 rounded-full border-[2px] border-brand-alt"></div>
          <Avatar>
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_AVATAR_API}/${userDetail?.user.profile}`}
              alt="@shadcn"
            />
            <AvatarFallback className="bg-primary-4">
              {userDetail?.user.firstName.charAt(0)}
              {userDetail?.user.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col pl-2 pr-5 tracking-[0.125rem] text-launchingBlack">
          <h1 className="text-sm font-semibold leading-6">
            Hello,{" "}
            <span className="capitalize">{userDetail?.user.firstName}</span>
            ...!
          </h1>
          <h1 className="text-xs font-medium leading-4 tracking-[0.125rem] text-lightBlue-4">
            {userDetail?.user.type}
          </h1>
        </div>
        <Icon
          icon="solar:refresh-bold-duotone"
          className="text-mauve-5 text-2xl cursor-pointer "
        />
      </div>

      <div className="flex justify-center gap-4 items-center">
        <ThemeToggler />

        <Icon
          icon="solar:bell-bold-duotone"
          className="text-2xl text-primary cursor-pointer"
        />
        <Music />
      </div>
    </div>
  );
};

export default NavBar;
