import TooltipWrapper from "@/components/molecules/TooltipWrapper";
import { IStartup } from "@/lib/models/startup.model";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IPorps {
  data: IStartup[];
  setSelectedRow: (data: IStartup) => void;
  setOpenRestoreDialog: (open: boolean) => void;
}
const ArchiveItem: React.FC<IPorps> = ({ data, setSelectedRow, setOpenRestoreDialog }) => {
  return (
    <div className="w-full">
      {data?.map((item: IStartup, index: number) => {
        return (
          <div className="flex gap-1 xl:gap-2 my-2 w-full">
            <div className="max-h-full xl:h-12 sm:min-w-12 min-w-10 bg-salmon-05 dark:bg-salmon-8 rounded-md flex justify-center items-center text-text-md font-regular text-launchingGray-5 dark:text-fg-white leading-5">
              {index + 1}
            </div>
            <div className="flex flex-col xl:flex-row w-full  gap-1 xl:gap-2">
              <div className="h-12 bg-salmon-05 dark:bg-salmon-8 rounded-md w-full flex justify-start items-center px-6 gap-5 ">
                <div className="w-max truncate text-salmon-7 dark:text-fg-white text-text-md font-bold tracking-tight">
                  {item?.investors?.[0]?.user?.firstName} {item?.investors?.[0]?.user?.lastName}
                </div>
                <div className="felx flex-grow divide-y divide-dashed">
                  <span className="flex items-center flex-grow">
                    <div className="relative w-full h-[0.5px] my-4 mx-">
                      <div className="absolute top-0 left-0 w-full h-full border-t-2 border-dashed border-salmon-3"></div>
                    </div>
                    <div
                      className="w-0 h-0 translate-x-1
              border-t-[8px] border-t-transparent
              border-l-[10px] border-l-salmon-3 dark:border-l-white
              border-b-[8px] border-b-transparent"
                    />
                  </span>
                </div>
                <div className="w-max truncate text-salmon-7 dark:text-fg-white text-text-md font-regular tracking-tight">
                  {item?.brainStorming?.title}
                </div>
              </div>

              <div className="flex flex-row max-w-full gap-1 xl:gap-2 group">
                <TooltipWrapper
                  title="Restore"
                  tooltipTrigger={
                    <div
                      className="h-12 w-full xl:min-w-12 bg-teal-05 dark:bg-teal-8 group-hover:bg-teal-1 group-hover:dark:bg-teal-7 rounded-md flex justify-center items-center hover:cursor-pointer"
                      onClick={() => {
                        setSelectedRow(item);
                        setOpenRestoreDialog(true);
                      }}
                    >
                      <Icon
                        icon="ic:baseline-restore-from-trash"
                        className="text-teal-6 dark:text-teal-05 group-hover:text-teal-7 group-hover:dark:text-teal-1 text-2xl"
                      />
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

export default ArchiveItem;
