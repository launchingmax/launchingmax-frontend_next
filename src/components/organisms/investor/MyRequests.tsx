"use client";

import MyDialog from "@/components/molecules/MyDialog";
import { Button } from "@/components/ui/button";
import { NextFetch } from "@/configs/api/next-fetch";
import { useGlobal } from "@/contexts/GlobalLayout";
import { IStartup } from "@/lib/models/startup.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import YesNoDialogContent from "../dashboard/common/yesNoDialogContent";

const MyRequests = () => {
  const { userDetail } = useGlobal();

  const [data, setData] = useState([]);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isResultDialogOpen, setResultDialogOpen] = useState(false);
  const [isRequestCanceled, setIsRequestCanceled] = useState<boolean>(false);

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
  }, [isRequestCanceled]);

  const cancleRequest = (startupID?: string) => {
    const fetchCancleRequest = async () => {
      try {
        const response = await NextFetch(`/v1/startup/${startupID}/investor-request/${userDetail?._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "plain/text",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setResultDialogOpen(true);
          setDialogOpen(false);
          data.acknowledged && setIsRequestCanceled(true);
        }
      } catch (error) {
        console.error("Server fetch error:", error);
      }
    };
    fetchCancleRequest();
  };

  return (
    <>
      <div className="w-full  p-6 rounded-lg bg-black/10">
        {data?.map((item: IStartup) => (
          <div className="grid grid-cols-12 w-full bg-white dark:bg-launchingBlue-8 h-max items-center gap-x-2 rounded-md px-4 md:px-2 my-2 py-2 ">
            <div className="col-span-4 sm:col-span-2 md:col-span-1 lg:col-span-1 w-full h-14  flex items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_ALL_API}${item?.visualBranding?.cover}`}
                alt="Company Logo"
                width={200}
                height={200}
              />
            </div>
            <div className="col-span-8 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center pl-2">
              <h2 className="font-medium text-text-xl text-launchingBlack dark:text-fg-white leading-[0.025rem]">
                {item.brainStorming.title}
              </h2>
            </div>
            <div className="col-span-6 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center space-x-2">
              <Icon icon={`twemoji:flag-${item?.placement?.[0]?.country.toLowerCase().replaceAll(" ", "-")}`} />
              <h2 className="font-medium text-text-md">{item.placement?.[0]?.country}</h2>
            </div>
            <div className="col-span-6 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center space-x-2">
              <Icon icon="solar:buildings-3-bold-duotone" className="text-xl text-launchingBlue-6" />
              <h2 className="font-regular text-text-sm leading-[1.125rem]">{item.industries?.[0]}</h2>
            </div>
            <div className="col-span-6 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center">
              ${item?.investmentFee}
            </div>
            <div className="col-span-6 md:col-span-1 lg:col-span-1 w-full h-14 flex items-center">
              ${item.maxStartupValue}
            </div>
            <div className="col-span-12 md:col-span-2 lg:col-span-2 w-full h-14 flex items-center justify-end md:pl-6">
              <MyDialog
                open={isDialogOpen}
                setOpen={setDialogOpen}
                dialogTrigger={
                  <button
                    className="h-10 w-full bg-salmon-1.5 hover:bg-salmon-2 rounded-md px-3 text-salmon-8 font-medium text-text-md leading-[0.02rem]"
                    onClick={() => setDialogOpen(true)}
                  >
                    Cancel
                  </button>
                }
                body={
                  <YesNoDialogContent
                    title="Are you sure you want to cancle this request?"
                    cancelButtonRender={() => setDialogOpen(false)}
                    actionButtonRender={() => cancleRequest(item._id)}
                  />
                }
              />
            </div>
          </div>
        ))}
      </div>
      <MyDialog
        open={isResultDialogOpen}
        setOpen={setResultDialogOpen}
        className={{ dialogContent: "bg-teal-05" }}
        body={<YesNoDialogContent type="success" title="aaaa" desc="" />}
      ></MyDialog>
    </>
  );
};

export default MyRequests;
