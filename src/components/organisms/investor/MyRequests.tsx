"use client";

import { Button } from "@/components/ui/button";
import { NextFetch } from "@/configs/api/next-fetch";
import { useGlobal } from "@/contexts/GlobalLayout";
import { IStartup } from "@/lib/models/startup.model";
import Image from "next/image";
import { useEffect, useState } from "react";

const MyRequests = () => {
  const { userDetail } = useGlobal();

  const [data, setData] = useState([]);

  const fetchMyRequestData = async () => {
    try {
      const response = await NextFetch(`/v1/startup?investors.user=${userDetail?._id}`);
      if (response.ok) {
        const data = await response.json();
        setData(data.items);
      }
    } catch (error) {
      console.error("Server fetch error:", error);
    }
  };

  useEffect(() => {
    fetchMyRequestData();
  }, []);

  return (
    <div className="w-full  p-6 rounded-lg bg-black/10">
      {data?.map((item: IStartup) => (
        <div className="grid md:grid-cols-12 grid-cols-3 w-full bg-white h-max items-center gap-x-2 rounded-md px-2 my-2">
          <div className="col-span-1 md:col-span-1 w-full h-14  flex items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_ALL_API}${item?.visualBranding?.cover}`}
              alt="Company Logo"
              width={200}
              height={200}
            />
          </div>
          <div className="col-span-1 md:col-span-2 w-full h-14 flex items-center">
            <h2 className="font-medium text-text-xl text-launchingBlack leading-[0.025rem]">
              {item.brainStorming.title}
            </h2>
          </div>
          <div className="col-span-1 md:col-span-3 w-full h-14 flex items-center">
            <h2 className="font-medium text-text-md">{item.placement?.[0]?.country}</h2>
          </div>
          <div className="col-span-1 md:col-span-2 w-full h-14 flex items-center">
            <h2 className="font-regular text-text-sm leading-[1.125rem]">{item.industries?.[0]}</h2>
          </div>
          <div className="col-span-1 md:col-span-2 w-full bg-orange-400 h-14"></div>
          <div className="col-span-1 md:col-span-1 w-full bg-slate-600 h-14"></div>
          <div className="col-span-1 md:col-span-1 w-full h-14 flex items-center justify-center">
            <button
              className="h-10 w-full bg-salmon-1.5 rounded-md px-3 text-salmon-8 font-medium text-text-md leading-[0.02rem]"
              onClick={() => {
                console.log(item._id);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
