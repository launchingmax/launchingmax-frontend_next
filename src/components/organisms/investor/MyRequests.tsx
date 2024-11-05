"use client";

import Fetch from "@/configs/api/fetch";
import { useGlobal } from "@/contexts/GlobalLayout";
import { AppContants } from "@/lib/constants";
import { getCookie } from "cookies-next";
import { method } from "lodash-es";
import { useEffect } from "react";

const MyRequests = () => {
  const { userDetail } = useGlobal();

  const fetchMyRequestData = async () => {
    return await Fetch({
      url: `/v1/startup?investors.user=${userDetail?._id}`,
      method: "GET",
      token: getCookie(AppContants.ParseSessionCookieName),
      next: { revalidate: 3600 },
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyRequestData();
      } catch (error) {
        console.error("error happended", error);
      }
    })();
  }, []);

  console.log("useDetail -- -- -- -   ", userDetail);
  return (
    <div className="w-full  p-6 rounded-lg bg-black/10">
      <div className="w-full bg-red-200 h-16 flex flex-row items-center rounded-md">
        <div className="w-2/12 bg-yellow-400 h-14"></div>
        <div className="w-2/12 bg-pink-400 h-14"></div>
        <div className="w-2/12 bg-green-400 h-14"></div>
        <div className="w-2/12 bg-blue-400 h-14"></div>
      </div>
    </div>
  );
};

export default MyRequests;
