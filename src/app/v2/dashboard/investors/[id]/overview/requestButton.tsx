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
  const { userDetail } = useGlobal();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isResultDialogOpen, setResultDialogOpen] = useState(false);

  const [buttonTitle, setButtonTitle] = useState<string>("Send Request");
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);

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
          data.acknowledged && setIsRequestSent(true);
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
        <MyDialog
          open={isDialogOpen}
          setOpen={setDialogOpen}
          dialogTrigger={
            <Button
              className="group flex py-3 w-[16vw] h-[6vh]  gap-x-8 bg-gradient-to-tr from-[#347CBE] to-[#074A88] items-center  text-white font-semibold  transition-all duration-300 "
              onClick={() => setDialogOpen(true)}
            >
              <span className="text-fg-white font-medium text-text-md transition-transform duration-300 transform group-hover:text-sm group-hover:translate-x-6">
                {buttonTitle}
              </span>
              <span className="bg-yell text-fg-white transition-transform duration-300 transform group-hover:translate-x-20 group-hover:mr-4">
                <Icon icon="solar:square-arrow-right-bold" className="text-xl group-hover:text-3xl" />
              </span>
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
      ) : (
        <Button className="flex py-3 px-[2.4rem] gap-x-8 bg-launchingGray-6 text-fg-white" disabled>
          Your message has been successfully sent.
        </Button>
      )}

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
