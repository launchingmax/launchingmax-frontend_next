import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { NextFetch } from "@/configs/api/next-fetch";

const Music = () => {
  const [music, setMusic] = useState();

  const fetchMusic = async () => {
    try {
      const response = await NextFetch("v1/music", { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        setMusic(data);
      }
    } catch (error) {
      console.error("Server fetch error:", error);
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  //console.log("music ", music);

  return (
    <div className="flex items-center w-[21.125rem] h-[3rem] bg-launchingBlue-05 dark:bg-launchingBlue-7 rounded-md">
      <div className=" flex flex-row justify-between p-1 w-full">
        <div className="flex flex-row gap-x-2 ">
          <div className="w-10 h-10 bg-blue-400 rounded-xs"></div>
          <div className="flex flex-col ">
            <h1 className="text-sm text-launchingBlack dark:text-fg-white font-medium leading-[1.135rem]">gewgfcwe</h1>
            <h1 className="text-xs text-lightBlue-5 font-medium leading-[1.135rem]">gewgfcwe</h1>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-x-4 pr-4">
          <Icon
            icon="solar:skip-previous-bold-duotone"
            className="text-sm text-primary-4 dark:text-launchingGray-3 cursor-pointer"
          />

          <Icon
            icon="solar:play-circle-bold-duotone"
            className="text-2xl text-primary-4 dark:text-launchingGray-1 cursor-pointer"
          />

          <Icon
            icon="solar:skip-next-bold-duotone"
            className="text-sm text-primary-4 dark:text-launchingGray-3  cursor-pointer"
          />
          <Icon
            icon="solar:volume-loud-bold-duotone"
            className="text-sm text-primary-4 dark:text-launchingGray-3  cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Music;
