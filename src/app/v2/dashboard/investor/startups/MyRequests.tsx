"use client";

import { NextFetch } from "@/configs/api/next-fetch";
import { useGlobal } from "@/contexts/GlobalLayout";
import { IStartup } from "@/lib/models/startup.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import _ from "lodash-es";
import ConfirmDialog, { ConfirmDialogType } from "@/components/organisms/dashboard/common/ConfirmDialog";

const MyRequests = () => {
  const { userDetail } = useGlobal();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isResultDialogOpen, setResultDialogOpen] = useState(false);
  const [isRequestCanceled, setIsRequestCanceled] = useState<{
    open: boolean;
    type?: any;
    title?: string;
    desc?: string;
  }>({ open: false });

  const fetchMyRequestData = async () => {
    try {
      setIsLoading(true);
      const response = await NextFetch(`/v1/startup?investors.user=${userDetail?._id}&investors.status=requested`, {
        next: { revalidate: 1 },
      });
      if (response.ok) {
        const data = await response.json();
        setData(data?.items);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Server fetch error:", error);
    }
  };

  useEffect(() => {
    console.log(" ----------------------------------------------------------------------------- ", userDetail);
    fetchMyRequestData();
  }, [isRequestCanceled]);

  const cancleRequest = (startupID?: string) => {
    const fetchCancleRequest = async () => {
      try {
        setIsLoading(true);
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
          data.acknowledged && data.modifiedCount > 0
            ? setIsRequestCanceled({
                open: true,
                type: "success",
                title: "The request has been canceled successfully.",
              })
            : setIsRequestCanceled({
                open: true,
                type: "error",
                title: "The request has not been canceled.",
              });
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Server fetch error:", error);
      }
    };
    fetchCancleRequest();
  };

  return (
    <>
      <div className="w-full  p-6 rounded-lg bg-black/10">
        {!isLoading ? (
          _.isEmpty(data) ? (
            data.map((item: IStartup) => (
              <div
                key={item._id}
                className="grid grid-cols-12 w-full bg-white dark:bg-launchingBlue-8 h-max items-center gap-x-2 rounded-md px-4 md:px-2 my-2 py-2 "
              >
                <div className="col-span-4 sm:col-span-2 md:col-span-1 lg:col-span-1 w-full h-14 flex items-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_ALL_API}${item?.visualBranding?.logo}`}
                    alt="Company Logo"
                    width={100}
                    height={100}
                    className="w-14 h-14"
                  />
                </div>
                <div className="col-span-8 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center ">
                  <h2 className="font-medium text-text-xl text-launchingBlack dark:text-fg-white leading-[0.025rem]">
                    {item?.brainStorming?.title}
                  </h2>
                </div>
                <div className="col-span-6 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center space-x-2">
                  <Icon icon={`twemoji:flag-${item?.placement?.[0]?.country.toLowerCase().replaceAll(" ", "-")}`} />
                  <h2 className="font-medium text-text-md">{item.placement?.[0]?.country}</h2>
                </div>
                <div className="col-span-6 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center space-x-2">
                  <Icon icon="solar:buildings-3-bold-duotone" className="text-xl text-launchingBlue-6" />
                  <h2 className="font-regular text-text-sm leading-[1.125rem]">{item?.industries?.[0]}</h2>
                </div>
                <div className="col-span-6 md:col-span-2  lg:col-span-2 w-full h-14 flex items-center">
                  ${item?.investmentFee}
                </div>
                <div className="col-span-6 md:col-span-1 lg:col-span-1 w-full h-14 flex items-center">
                  ${item?.maxStartupValue}
                </div>
                <div className="col-span-12 md:col-span-2 lg:col-span-2 w-full h-14 flex items-center justify-end md:pl-6">
                  <ConfirmDialog
                    dialogTrigger={
                      <button
                        className="h-10 w-full bg-salmon-1.5 hover:bg-salmon-2 rounded-md px-3 text-salmon-8 font-medium text-text-md leading-[0.02rem]"
                        onClick={() => setDialogOpen(true)}
                      >
                        Cancel
                      </button>
                    }
                    open={isDialogOpen}
                    setOpen={setDialogOpen}
                    title="Are you sure you want to cancle this request?"
                    type={ConfirmDialogType.error}
                    cancelButtonRender={() => setDialogOpen(false)}
                    actionButtonRender={() => cancleRequest(item._id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center w-full bg-white dark:bg-launchingBlue-8 h-max items-center gap-x-2 rounded-md px-4 md:px-2 my-2 py-2 ">
              <h2 className="text-text-xl font-medium text-launchingBlue-9 dark:text-fg-white"> NO REQUEST !</h2>
            </div>
          )
        ) : (
          <div className="space-y-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        )}
      </div>

      <ConfirmDialog
        open={isResultDialogOpen}
        setOpen={setResultDialogOpen}
        type={isRequestCanceled.type}
        title={isRequestCanceled.title}
        actionButtonTitle="Ok"
        actionButtonRender={() => setResultDialogOpen(false)}
      />
    </>
  );
};

export default MyRequests;
