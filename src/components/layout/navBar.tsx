"use client";
import { useTheme } from "next-themes";
import ThemeToggler from "../molecules/ThemeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { encodeQueryString, SvgIconComponent } from "@/lib/helper";
import Fetch from "@/configs/api/fetch";
import { getCookie } from "cookies-next";
import { AppContants } from "@/lib/constants";
import LaunchinMaxLogo from "../../../public/assets/icons/LaunchingMax-logo.svg";
import { CgMail } from "react-icons/cg";
import { useEffect, useState } from "react";
import { IUserResponse } from "@/lib/models/user.model";
import Music from "../organisms/Music";
import useGenerateLayout from "./hook/useGenerateLayout";

const NavBar = () => {
  const [accountDetail, setAccountDetail] = useState<IUserResponse>();

  const { userDetail } = useGenerateLayout();

  return (
    <div className="sticky top-0 flex justify-between bg-white dark:bg-launchingBlue-8.5 border-gray-200 rounded-xl py-2 pr-2 pl-3">
      <div className="flex items-center ">
        <div className="relative">
          <div className="absolute right-0 bottom-0 z-20 w-3 h-3 bg-green-400 rounded-full border-[2px] border-white"></div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
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
        <img src={"/assets/icons/refresh-bold-duotone.svg"} />
      </div>

      <div className="flex justify-center gap-4 ">
        <ThemeToggler />

        <img src={"/assets/icons/bell-bold-duotone.svg"} />
        <Music />
      </div>
    </div>
  );
};

export default NavBar;
