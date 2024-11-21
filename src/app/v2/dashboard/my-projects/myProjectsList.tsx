"use client";

import { NextFetch } from "@/configs/api/next-fetch";
import { useGlobal } from "@/contexts/GlobalLayout";
import { IStartup } from "@/lib/models/startup.model";
import { trimStart } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyProjectsList = () => {
  const { userDetail } = useGlobal();

  const [data, setData] = useState<IStartup[]>([]);

  const fetchData = async () => {
    try {
      const response = await NextFetch(`/v1/startup?investors.user=${userDetail?._id}&investors.status=accepted`, {
        next: { revalidate: 1 },
      });
      if (response.ok) {
        const data = await response.json();
        setData(data.items);
        return data;
      }
    } catch (error) {
      console.error("Server fetch error:", error);
    }
  };

  useEffect(() => {
    console.log(" ----------------------------------------------------------------------------- ", userDetail);
    fetchData();
  }, [userDetail]);

  return (
    <div className="w-full">
      {data?.length > 0 ? (
        data.map((item: IStartup) => (
          <div className="grid grid-cols-12 w-full bg-lightBlue-05 dark:bg-launchingBlue-8 h-max items-center gap-x-2 rounded-md px-4 md:px-2 my-2 py-2 ">
            <div className="col-span-4 sm:col-span-2 md:col-span-1 lg:col-span-1 w-full h-14  flex items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_ALL_API}${item?.visualBranding?.logo}`}
                alt="Company Logo"
                width={200}
                height={200}
                className="w-14 h-14"
              />
            </div>
            <div className="col-span-8 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center">
              <h2 className="font-medium text-text-xl text-launchingBlack dark:text-fg-white leading-[0.025rem]">
                {item?.brainStorming?.title}
              </h2>
            </div>
            <div className="col-span-6 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center space-x-2">
              {/* <Icon icon={`twemoji:flag-${item?.placement?.[0]?.country.toLowerCase().replaceAll(" ", "-")}`} /> */}
              <h2 className="font-medium text-text-md">{item.placement?.[0]?.country}</h2>
            </div>
            <div className="col-span-6 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center space-x-2">
              {/* <Icon icon="solar:buildings-3-bold-duotone" className="text-xl text-launchingBlue-6" /> */}
              <h2 className="font-regular text-text-sm leading-[1.125rem]">{item?.industries?.[0]}</h2>
            </div>
            <div className="col-span-6 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center">
              ${item?.investmentFee}
            </div>
            <div className="col-span-6 md:col-span-1 lg:col-span-1 w-full h-14 flex items-center">
              ${item?.maxStartupValue}
            </div>
            <div className="col-span-12 md:col-span-2 lg:col-span-2 w-full h-14 flex items-center justify-end md:pl-6">
              <Link href={`${"/" + trimStart(`/v2/dashboard/startups/${item._id}/#Overview`, "/")}`}>
                <button
                  className="h-10 w-full bg-[#E8F0F7] hover:bg-launchingBlue-1.5 rounded-md px-6 py-4 text-salmon-8 font-medium text-text-md leading-[0.02rem]"
                  //onClick={() => setDialogOpen(true)}
                >
                  Detail
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center w-full bg-white dark:bg-launchingBlue-8 h-max items-center gap-x-2 rounded-md px-4 md:px-2 my-2 py-2 ">
          <h2 className="text-text-xl font-medium text-launchingBlue-9 dark:text-fg-white"> NO REQUEST !</h2>
        </div>
      )}
    </div>
  );
};

export default MyProjectsList;
