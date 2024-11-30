"use client";

import { SonnerToasterWrapper, SonnerType } from "@/components/molecules/SonnerToasterWrapper";
import ConfirmDialog, { ConfirmDialogType } from "@/components/organisms/dashboard/common/ConfirmDialog";
import DashSection from "@/components/organisms/dashboard/DashSection";
import { Button } from "@/components/ui/button";
import { NextFetch } from "@/configs/api/next-fetch";
import { useGlobal } from "@/contexts/GlobalLayout";
import { RequestStatus } from "@/lib/constants/request.enum";
import { IStartup } from "@/lib/models/startup.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Documents = ({ startup }: { startup: IStartup }) => {
  const { userDetail } = useGlobal();
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);

  const { data: isRequestSentbefore } = useQuery({
    queryKey: ["is-request-sent"],
    queryFn: async () => {
      try {
        const response = await NextFetch(
          `/v1/request?requestee=${startup.owner}&requests=pitch-deck-request&startup=${startup._id}`
        );
        if (response.ok) {
          const data = await response.json();
          data.total > 0 && setIsRequestSent(true);
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { data: dataa, isLoading } = useQuery({
    queryKey: ["request-document"],
    queryFn: async () => {
      const body = {
        requester: userDetail?._id,
        requestee: startup.owner, //..
        requests: ["pitch-deck-request"], //,..
        status: RequestStatus.Requested,
        startup: startup._id, //..
      };
      try {
        const response = await NextFetch(`/v1/request`, { method: "POST", body: JSON.stringify(body) });
        console.log("mm 555555555    ", response);
        if (response.ok) {
          const data = await response.json();
          console.log("mm 555555555    ", data);
          if (response.status == 201) {
            SonnerToasterWrapper("successful!", {
              type: SonnerType.success,
              description: `The request is sent successfully.`,
            });
            setIsRequestSent(true);
          } else {
            SonnerToasterWrapper("error!", {
              type: SonnerType.error,
              description: `The request is not sent successfully.`,
            });
          }
          setDialogOpen(false);
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    enabled: shouldFetch,
  });

  return (
    <DashSection heading="Documents" className="z-0">
      <div className="w-full">
        <div
          dangerouslySetInnerHTML={{ __html: startup.idea.pitchDeck.summery ?? "" }}
          className="text-start text-text-md font-regular leading-[1.4rem] tracking-[0.02rem] whitespace-pre-wrap"
        />

        <div className="flex justify-center w-full mt-6 ">
          <div className="">
            {!isRequestSent ? (
              <ConfirmDialog
                open={isDialogOpen}
                setOpen={setDialogOpen}
                dialogTrigger={
                  <div className="flex justify-center ">
                    <Button
                      loading={isLoading}
                      className="group flex py-3 min-w-[16vw] min-h-[6vh]  gap-x-8 bg-gradient-to-tr from-[#347CBE] to-[#074A88] items-center  text-white font-semibold  transition-all duration-300 "
                    >
                      <span className="text-fg-white font-medium text-text-md transition-transform duration-300 transform group-hover:text-sm group-hover:translate-x-6">
                        Request for document
                      </span>
                      <span className="bg-yell text-fg-white transition-transform duration-300 transform group-hover:translate-x-14 group-hover:mr-4">
                        <Icon icon="solar:square-arrow-right-bold" className="text-xl group-hover:text-3xl" />
                      </span>
                    </Button>
                  </div>
                }
                title="Are you sure you want to send request?"
                type={ConfirmDialogType.error}
                cancelButtonRender={() => setDialogOpen(false)}
                actionButtonRender={() => setShouldFetch(true)}
              />
            ) : (
              <div className="flex justify-center">
                <Button
                  className="flex py-3 min-w-[16vw] min-h-[6vh] bg-launchingGray-6 text-fg-white !cursor-not-allowed"
                  disabled
                >
                  You have requested
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashSection>
  );
};

export default Documents;
