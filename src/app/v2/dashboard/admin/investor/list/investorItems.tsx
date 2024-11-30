import TooltipWrapper from "@/components/molecules/TooltipWrapper";
import { IUser } from "@/lib/models/user.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import { isEmpty } from "lodash-es";
import Image from "next/image";

interface IPorps {
  data: IUser[];
  setSelectedRow: (data: IUser) => void;
  setOpenDialog: (open: boolean) => void;
}
const InvestorItems: React.FC<IPorps> = ({ data, setSelectedRow, setOpenDialog }) => {
  console.log(process.env.NEXT_PUBLIC_ALL_API);
  return (
    <div className="w-full">
      <div className="hidden xl:flex gap-2 my-2 w-full rounded-md">
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
      </div>

      {data?.map((item: IUser, index: number) => {
        return (
          <div className="flex gap-1 xl:gap-2 my-2 w-full">
            <div className="max-h-full xl:h-12 sm:min-w-12 min-w-10 bg-[#F9F5F9] dark:bg-mauve-6 rounded-md flex justify-center items-center text-text-md font-regular text-launchingGray-8 dark:text-fg-white leading-5">
              {index + 1}
            </div>
            <div className="flex flex-col xl:flex-row w-full gap-1 xl:gap-2">
              <div className="grid grid-cols-10 gap-2 w-full rounded-md max-h-full lg:h-12 bg-[#F9F5F9] dark:bg-mauve-6  pl-1 pt-1 lg:pt-0">
                <div className="lg:col-span-3 col-span-10 flex justify-start items-center gap-x-2 w-full overflow-hidden">
                  <div className="min-w-10 h-10  rounded-md bg-white dark:bg-launchingBlue-6">
                    {(item?.avatar?.includes("lh3.googleusercontent.com") || item?.avatar?.includes("profiles")) && (
                      <Image
                        src={`${
                          item?.avatar.includes("lh3.googleusercontent.com")
                            ? `${item.avatar}`
                            : `${process.env.NEXT_PUBLIC_ALL_API}${item.avatar}`
                        }`}
                        alt="profile"
                        height={40}
                        width={40}
                        className="rounded-md"
                      />
                    )}
                  </div>
                  <h2 className="truncate flex-grow text-text-md font-medium text-launchingGray-8 dark:text-fg-white leading-5">
                    {" "}
                    {item.firstName} ${item.lastName}
                  </h2>
                </div>
                <div className="lg:col-span-2 col-span-5 flex justify-center items-center gap-1 lg:p-0 px-3 py-[0.625rem]">
                  {["iran", "canada"].map((item: string) => (
                    <Icon icon={`twemoji:flag-${item.toLowerCase().replaceAll(" ", "-")}`} className="h-4 w-4" />
                  ))}
                </div>
                <div className="lg:col-span-2 col-span-5 flex justify-center items-center px-3 lg:p-0 py-[0.625rem] text-text-sm font-regular text-launchingGray-6 dark:text-fg-white leading-5">
                  {item?.profile?.invRange?.length == 2 ? (
                    <h2>
                      {item?.profile?.invRange[0]} to {item?.profile?.invRange[1]}
                    </h2>
                  ) : item?.profile?.invRange?.length == 1 ? (
                    <h2>{item?.profile?.invRange}</h2>
                  ) : (
                    <h2>-</h2>
                  )}
                </div>
                <div className="lg:col-span-2 col-span-5 flex justify-center items-center px-3 lg:p-0 py-[0.625rem] text-text-sm font-regular text-launchingGray-6 dark:text-fg-white leading-5">
                  {!isEmpty(item?.profile?.invTerm) ? <h2>{item?.profile?.invTerm}</h2> : <h2>-</h2>}
                </div>
                <div className="lg:col-span-1 col-span-5 flex justify-center items-center px-3 lg:p-0 py-[0.625rem] text-text-sm font-regular text-launchingGray-6 dark:text-fg-white leading-5">
                  1 year
                </div>
              </div>

              <div className="flex flex-row max-w-full xl:w-40 gap-1 xl:gap-2">
                <TooltipWrapper
                  title="Detail"
                  tooltipTrigger={
                    <div
                      className="h-12 w-1/3 xl:min-w-12 group bg-mauve-05 dark:bg-mauve-5 hover:bg-mauve-1 hover:dark:bg-mauve-4 rounded-md flex justify-center items-center hover:cursor-pointer"
                      onClick={() => {
                        setSelectedRow(item);
                        setOpenDialog(true);
                      }}
                    >
                      <Icon
                        icon="solar:info-square-bold-duotone"
                        className="text-mauve-5 dark:text-mauve-05 group-hover:text-mauve-6 group-hover:dark:text-mauve-1 text-2xl"
                      />
                    </div>
                  }
                />

                <div className="h-12 w-1/3 xl:min-w-12 bg-lightBlue-05 dark:bg-lightBlue-7 rounded-md flex justify-center items-center hover:cursor-not-allowed">
                  <Icon icon="solar:dialog-bold-duotone" className="text-lightBlue-6 dark:text-lightBlue-05 text-2xl" />
                </div>

                <div className="h-12 w-1/3 xl:min-w-12 bg-salmon-05 dark:bg-salmon-6 rounded-md flex justify-center items-center hover:cursor-not-allowed">
                  <Icon icon="solar:user-block-bold-duotone" className="text-salmon-6 dark:text-salmon-05 text-2xl" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvestorItems;
