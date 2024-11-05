"use client";

import MyDialog from "@/components/molecules/MyDialog";
import YesNoDialogContent from "@/components/organisms/dashboard/common/yesNoDialogContent";
import { Button } from "@/components/ui/button";
import { NextFetch } from "@/configs/api/next-fetch";
import { useGlobal } from "@/contexts/GlobalLayout";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import { useState } from "react";

const RequestButton = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isResultDialogOpen, setResultDialogOpen] = useState(false);
  const { userDetail } = useGlobal();

  const callback = (val: any) => {
    setDialogOpen(() => {
      //filterRender && filterRender(val);
      return false;
    });
  };
  const pathname = usePathname();
  const startUpID = pathname.replace("/dashboard/investors/", "");

  const sendRequest = () => {
    const body = { user: userDetail?._id, status: "requested", requester: "other" };
    const fetchSendRequest = async () => {
      try {
        const response = await NextFetch(`/v1/startup/${startUpID}/investor-request`, {
          method: "POST",
          body: JSON.stringify(body),
        });
      } catch (error) {
        console.error("Server fetch error:", error);
      }
    };
    fetchSendRequest();
    setDialogOpen(false);
    setResultDialogOpen(true);
  };

  return (
    <>
      <MyDialog
        open={isDialogOpen}
        setOpen={setDialogOpen}
        dialogTrigger={
          <Button
            className="flex py-3 px-[7rem] gap-x-8 bg-gradient-to-tr from-[#347CBE] to-[#074A88]"
            onClick={() => setDialogOpen(true)}
          >
            Send Request
            <Icon icon="solar:square-arrow-right-bold" className="text-xl" />
          </Button>
        }
        body={
          <YesNoDialogContent
            title="Are you sure you want to send request?"
            cancelButtonRender={() => setDialogOpen(false)}
            actionButtonRender={sendRequest}
          />
        }
      />

      <MyDialog
        open={isResultDialogOpen}
        setOpen={setResultDialogOpen}
        className={{ dialogContent: "bg-teal-05" }}
        body={
          <YesNoDialogContent
            type="success"
            title="Thank you"
            desc="Thank you for submitting your idea to us! We appreciate your initiative. We will review your idea at the earliest opportunity, and if accepted, we will kickstart the project together, working towards success. If you have any supporting documents such as a business model canvas, pitch deck, or other relevant materials, please proceed to submit them by clicking on 'Submit Documents.' Otherwise, you can dismiss this step if you don't have additional materials. Looking forward to potential collaboration"
          />
        }
      ></MyDialog>
    </>
  );
};

export default RequestButton;
