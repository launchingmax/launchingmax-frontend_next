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
      {data?.map((item: IStartup, index: number) => {
        return (
          <div className="flex gap-1 xl:gap-2 my-2 w-full">
            <div className="max-h-full xl:h-12 sm:min-w-12 min-w-10 bg-salmon-05 dark:bg-salmon-8 rounded-md flex justify-center items-center text-text-md font-regular text-launchingGray-5 dark:text-fg-white leading-5">
              {index + 1}
            </div>
            <div className="flex flex-col xl:flex-row w-full  gap-1 xl:gap-2">
              <div className="min-h-12 h-full grid grid-cols-3 bg-salmon-05 dark:bg-salmon-8 rounded-md w-full justify-start items-center px-6 gap-5 py-2 lg:py-0">
                <h2 className="col-span-3 lg:col-span-1 truncate overflow-hidden text-salmon-7 dark:text-fg-white text-text-md font-bold tracking-tight">
                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </h2>

                <div className="col-span-3 lg:col-span-2 truncate break-words text-salmon-7 dark:text-fg-white text-text-md font-regular tracking-tight">
                  <span className="font-bold">Title: </span>
                  bbbbbbbbbbbbbssssssssssssssssssssssssssssss
                </div>
              </div>

              <div className="flex flex-row max-w-full gap-1 xl:gap-2">
                <TooltipWrapper
                  title="Restore"
                  tooltipTrigger={
                    <div
                      className="h-12 w-full xl:min-w-12 bg-teal-05 dark:bg-teal-8 rounded-md flex justify-center items-center hover:cursor-pointer"
                      onClick={() => {
                        setSelectedRow(item);
                        setOpenInfoDialog(true);
                      }}
                    >
                      <Icon icon="ic:baseline-restore-from-trash" className="text-teal-6 dark:text-teal-05 text-2xl" />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestItems;
