import { IUser } from "@/lib/models/user.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import { isEmpty } from "lodash-es";
import Image from "next/image";

interface IPorps {
  data: IUser[];
}
const InvestorItems: React.FC<IPorps> = ({ data }) => {
  console.log(process.env.NEXT_PUBLIC_ALL_API);
  return (
    <div className="w-full">
      <div className="flex gap-2 my-2 w-full rounded-md">
        <div className="h-12 w-12  flex justify-center items-center bg-launchingBlue-1 dark:bg-launchingBlue-6 rounded-md text-text-md font-semibold leading-5 text-launchingGray-7 dark:text-fg-white">
          Row
        </div>
        <div className="grid grid-cols-10  flex-grow h-12 bg-launchingBlue-1 dark:bg-launchingBlue-6 rounded-md">
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

        <div className="h-12 w-40 flex justify-center items-center bg-launchingBlue-1 dark:bg-launchingBlue-6 rounded-md text-text-md font-semibold leading-5 text-launchingGray-7 dark:text-fg-white">
          Actions
        </div>
      </div>

      {data?.map((item: IUser, index: number) => {
        console.log(" mm 20 0 0 0 0 0 0 0 -----     ", `${process.env.NEXT_PUBLIC_ALL_API}${item.avatar}`);
        return (
          <div className="flex gap-2 my-2 w-full">
            <div className="h-12 w-12 bg-[#F9F5F9] dark:bg-mauve-6 rounded-md flex justify-center items-center">
              {index + 1}
            </div>
            <div className="grid grid-cols-10  flex-grow rounded-md h-12 bg-[#F9F5F9] dark:bg-mauve-6  pl-1 ">
              <div className="col-span-3 flex justify-start items-center gap-x-2 w-full">
                <div className="w-10 h-10 rounded-md bg-white dark:bg-launchingBlue-6">
                  {item?.avatar && (
                    <Image
                      src={`${
                        item.avatar.includes("lh3.googleusercontent.com")
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
                {item.firstName} ${item.lastName}
              </div>
              <div className=" col-span-2 flex justify-center items-center gap-1">
                {["iran", "canada"].map((item: string) => (
                  <Icon icon={`twemoji:flag-${item.toLowerCase().replaceAll(" ", "-")}`} className="h-4 w-4" />
                ))}
              </div>
              <div className=" col-span-2 flex justify-center items-center">
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
              <div className=" col-span-2 flex justify-center items-center">
                {!isEmpty(item?.profile?.invTerm) ? <h2>{item?.profile?.invTerm}</h2> : <h2>-</h2>}
              </div>
              <div className=" col-span-1 flex justify-center items-center">1 year</div>
            </div>

            <div className="h-12 w-12 bg-mauve-05 dark:bg-mauve-5 rounded-md flex justify-center items-center hover:cursor-pointer">
              <Icon icon="solar:info-square-bold-duotone" className="text-mauve-5 dark:text-mauve-05 text-2xl" />
            </div>
            <div className="h-12 w-12 bg-lightBlue-05 dark:bg-lightBlue-7 rounded-md flex justify-center items-center hover:cursor-pointer">
              <Icon icon="solar:dialog-bold-duotone" className="text-lightBlue-6 dark:text-lightBlue-05 text-2xl" />
            </div>
            <div className="h-12 w-12 bg-salmon-05 dark:bg-salmon-6 rounded-md flex justify-center items-center hover:cursor-pointer">
              <Icon icon="solar:user-block-bold-duotone" className="text-salmon-6 dark:text-salmon-05 text-2xl" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvestorItems;
