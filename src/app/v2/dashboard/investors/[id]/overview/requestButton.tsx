"use client";

import ConfirmDialog from "@/components/organisms/dashboard/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { NextFetch } from "@/configs/api/next-fetch";
import { useGlobal } from "@/contexts/GlobalLayout";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RequestButton = ({ investors }: { investors: any[] }) => {
  const { userDetail } = useGlobal();

  const foundItem = investors.length > 0 && investors?.find((item) => item.user === userDetail?._id); // for checking that the user has requested before

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isResultDialogOpen, setResultDialogOpen] = useState(false);

  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);

  const [isRequestCanceled, setIsRequestCanceled] = useState<{
    open: boolean;
    type?: any;
    title?: string;
    desc?: string;
  }>({ open: false });

  useEffect(() => {
    foundItem && setIsRequestSent(true);
  }, [investors]);

  const callback = (val: any) => {
    setDialogOpen(() => {
      //filterRender && filterRender(val);
      return false;
    });
  };
  const pathname = usePathname();
  const startUpID = pathname.replace("/v2/dashboard/investors/", "");

  const sendRequest = () => {
    const body = { user: userDetail?._id, status: "requested", requester: "other" };
    const fetchSendRequest = async () => {
      try {
        const response = await NextFetch(`/v1/startup/${startUpID}/investor-request`, {
          method: "POST",
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await response.json();
          setResultDialogOpen(true);
          setDialogOpen(false);
          if (data.acknowledged && data.modifiedCount > 0) {
            setIsRequestCanceled({
              open: true,
              type: "success",
              title: "Your request has been sent successfully.",
            });
            setIsRequestSent(true);
          } else {
            setIsRequestCanceled({
              open: true,
              type: "error",
              title: "Your request has not been sent successfully.",
            });
          }
        }
      } catch (error) {
        console.error("Server fetch error:", error);
      }
    };
    fetchSendRequest();
  };

  return (
    <>
      {!isRequestSent ? (
        <ConfirmDialog
          open={isDialogOpen}
          setOpen={setDialogOpen}
          dialogTrigger={
            <Button
              className="group flex py-3 w-[16vw] h-[6vh]  gap-x-8 bg-gradient-to-tr from-[#347CBE] to-[#074A88] items-center  text-white font-semibold  transition-all duration-300 "
              onClick={() => setDialogOpen(true)}
            >
              <span className="text-fg-white font-medium text-text-md transition-transform duration-300 transform group-hover:text-sm group-hover:translate-x-6">
                Send Request
              </span>
              <span className="bg-yell text-fg-white transition-transform duration-300 transform group-hover:translate-x-20 group-hover:mr-4">
                <Icon icon="solar:square-arrow-right-bold" className="text-xl group-hover:text-3xl" />
              </span>
            </Button>
          }
          title="Are you sure you want to send request?"
          type="error"
          cancelButtonRender={() => setDialogOpen(false)}
          actionButtonRender={sendRequest}
        />
      ) : (
        <Button className="flex py-3 w-[16vw] h-[6vh] bg-launchingGray-6 text-fg-white" disabled>
          You have requested
        </Button>
      )}

      <ConfirmDialog
        open={isResultDialogOpen}
        setOpen={setResultDialogOpen}
        type={isRequestCanceled.type}
        title={isRequestCanceled.title}
      />
    </>
  );
};

export default RequestButton;
