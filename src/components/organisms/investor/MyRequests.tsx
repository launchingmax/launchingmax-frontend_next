"use client";

import { NextFetch } from "@/configs/api/next-fetch";
import { useGlobal } from "@/contexts/GlobalLayout";
import { useEffect } from "react";

const MyRequests = () => {
  const { userDetail } = useGlobal();

  const fetchMyRequestData = async () => {
    try {
      const response = await NextFetch(`/v1/startup?investors.user=${userDetail?._id}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Server fetch error:", error);
    }
  };

  useEffect(() => {
    fetchMyRequestData();
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
