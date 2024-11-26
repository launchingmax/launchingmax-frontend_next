import TooltipWrapper from "@/components/molecules/TooltipWrapper";
import { IStartup } from "@/lib/models/startup.model";
import { IUser } from "@/lib/models/user.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import { isEmpty } from "lodash-es";
import Image from "next/image";

interface IPorps {
  data: IStartup[];
  setSelectedRow: (data: IStartup) => void;
  setOpenInfoDialog: (open: boolean) => void;
  setOpenAcceptDialog: (open: boolean) => void;
  setOpenRejectDialog: (open: boolean) => void;
}
const RequestItems: React.FC<IPorps> = ({
  data,
  setSelectedRow,
  setOpenInfoDialog,
  setOpenRejectDialog,
  setOpenAcceptDialog,
}) => {
  console.log("mm-4567 ---  dataaaa   ", data);
  return (
    <div className="w-full">
      {/* <div className="hidden xl:flex gap-2 my-2 w-full rounded-md">
        <div className="h-12 min-w-12  flex justify-center items-center bg-launchingBlue-1 dark:bg-launchingBlue-6 rounded-md text-text-md font-semibold leading-5 text-launchingGray-7 dark:text-fg-white">
          Row
        </div>
        <div className="grid grid-cols-10 w-full h-12 bg-launchingBlue-1 dark:bg-launchingBlue-6 rounded-md">
          <div className="col-span-3 flex justify-center items-center gap-x-2 text-text-md font-semibold leading-5 text-launchingGray-7 dark:text-fg-white">
            Name
          </div>
          <div className=" col-span-2 flex justify-center items-center text-text-md font-semibold leading-5 text-launchingGray-7 dark:text-fg-white">
            Countries
          </div>
          <div className=" col-span-2 flex justify-center items-center text-text-md font-semibold leading-5 text-launchingGray-7 dark:text-fg-white">
            Investment Range
          </div>
          <div className=" col-span-2 flex justify-center items-center text-text-md font-semibold leading-5 text-launchingGray-7 dark:text-fg-white">
            Investment Term
          </div>
          <div className=" col-span-1 flex justify-center items-center text-text-md font-semibold leading-5 text-launchingGray-7 dark:text-fg-white">
            jjjjjjjj
          </div>
        </div>

        <div className="h-12 min-w-40 flex justify-center items-center bg-launchingBlue-1 dark:bg-launchingBlue-6 rounded-md text-text-md font-semibold leading-5 text-launchingGray-7 dark:text-fg-white">
          Actions
        </div>
      </div> */}

      {data?.map((item: IStartup, index: number) => {
        return (
          <div className="flex gap-1 xl:gap-2 my-2 w-full">
            <div className="max-h-full xl:h-12 sm:min-w-12 min-w-10 bg-launchingBlue-05 dark:bg-launchingBlue-7 rounded-md flex justify-center items-center text-text-md font-regular text-launchingGray-5 dark:text-fg-white leading-5">
              {index + 1}
            </div>
            <div className="flex flex-col xl:flex-row w-full  gap-1 xl:gap-2">
              <div className="h-12 bg-launchingBlue-05 dark:bg-launchingBlue-7 rounded-md w-full flex justify-start items-center px-6 gap-5 ">
                <div className="w-max truncate text-launchingBlue-5 dark:text-fg-white text-text-md font-bold tracking-tight">
                  {item.owner.firstName} {item.owner.lastName}
                </div>
                <div className="felx flex-grow divide-y divide-dashed">
                  <span className="flex items-center flex-grow">
                    <div className="relative w-full h-[0.5px] my-4 mx-4">
                      <div className="absolute top-0 left-0 w-full h-full border-t-2 border-dashed border-launchingBlue-1.5"></div>
                    </div>
                    <div
                      className="w-0 h-0 translate-x-1
              border-t-[8px] border-t-transparent
              border-l-[10px] border-l-launchingBlue-1.5 dark:border-l-white
              border-b-[8px] border-b-transparent"
                    />
                  </span>
                </div>
                <div className="w-max truncate text-launchingBlue-5 dark:text-fg-white text-text-md font-regular tracking-tight">
                  rrr
                </div>
              </div>

              <div className="flex flex-row max-w-full xl:w-40 gap-1 xl:gap-2">
                <TooltipWrapper
                  title="Detail"
                  tooltipTrigger={
                    <div
                      className="h-12 w-1/3 xl:min-w-12 bg-launchingBlue-05 dark:bg-launchingBlue-5 rounded-md flex justify-center items-center hover:cursor-pointer"
                      onClick={() => {
                        setSelectedRow(item);
                        setOpenInfoDialog(true);
                      }}
                    >
                      <Icon
                        icon="solar:info-square-bold-duotone"
                        className="text-launchingBlue-5 dark:text-launchingBlue-05 text-2xl"
                      />
                    </div>
                  }
                />

                <TooltipWrapper
                  title="Reject"
                  tooltipTrigger={
                    <div
                      className="h-12 w-1/3 xl:min-w-12 bg-salmon-05 dark:bg-salmon-7 rounded-md flex justify-center items-center hover:cursor-pointer"
                      onClick={() => setOpenRejectDialog(true)}
                    >
                      <Icon icon="entypo:squared-cross" className="text-salmon-6 dark:text-salmon-05 text-2xl" />
                    </div>
                  }
                />

                <TooltipWrapper
                  title="Accept"
                  tooltipTrigger={
                    <div
                      className="h-12 w-1/3 xl:min-w-12 bg-teal-05 dark:bg-teal-7 rounded-md flex justify-center items-center hover:cursor-pointer"
                      onClick={() => setOpenAcceptDialog(true)}
                    >
                      <Icon icon="solar:check-square-bold-duotone" className="text-teal-6 dark:text-teal-05 text-2xl" />
                    </div>
                  }
                />
              </div>

              {/* <div className="flex flex-row max-w-full xl:w-48 gap-1 xl:gap-2">
            <div className="h-12 w-1/2 xl:min-w-12 bg-salmon-05 dark:bg-salmon-7 rounded-md flex justify-center items-center hover:cursor-pointer text-text-md font-regular tracking-tight text-salmon-6 dark:text-salmon-05 ">
              Reject
            </div>
            <div className="h-12 w-1/2 xl:min-w-12 bg-teal-05 dark:bg-teal-7 rounded-md flex justify-center items-center hover:cursor-pointer text-text-md font-regular tracking-tight text-teal-6 dark:text-teal-05 ">
              Accept
            </div>
          </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestItems;
