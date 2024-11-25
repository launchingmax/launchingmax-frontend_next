"use client";

import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import { Separator } from "@/components/ui/separator";
import { ISupportiveCenter } from "@/lib/models/supportive-center.model";
import { IUser } from "@/lib/models/user.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

import moment from "moment";

interface IProps {
  user: IUser;
}
const InvestorDetail: React.FC<IProps> = ({ user }) => {
  console.log(" mm 999999999999999999   ", user);
  return (
    <div className="w-[90vw] md:w-[45.5rem] ">
      <SectionTitle title={user?.firstName} />

      <div className="space-y-6 overflow-y-auto lg:w-full h-max md:px-8 px-4 pb-4">
        <div className="flex flex-col md:flex-row md:space-x-6 ">
          <Image
            src={`${process.env.NEXT_PUBLIC_ALL_API}${user.avatar}`}
            alt="Company Logo"
            width={200}
            height={200}
            className="w-[6.625rem] h-[6.625rem] rounded-md"
          />

          <div className="flex flex-col space-y-2">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-fg-white">About</h2>
            <h2 className="text-text-sm font-regular leading-5 text-justify text-launchingGray-7 dark:text-fg-white">
              “{user.profile?.bio}”
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md: ">
          <div className="flex flex-col gap-y-3 w-full md:w-1/2">
            <div className="flex items-center gap-x-2">
              <Icon icon={`twemoji:flag-${"Iran".toLowerCase().replaceAll(" ", "-")}`} className="text-text-xl " />
              <h2 className="text-text-sm font-regular tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                aaaaaa
              </h2>
            </div>

            <div className="flex items-center gap-x-2">
              <Icon
                icon={`${user.profile?.gender == "Man" ? "solar:men-bold-duotone" : "solar:women-bold-duotone"}`}
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                {user.profile?.gender}
              </h2>
            </div>

            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:calendar-date-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                {moment(user.profile?.birthDate).format("YYYY/MM/DD")}
              </h2>
            </div>

            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:map-point-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                ssssssss
              </h2>
            </div>

            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:phone-calling-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                (+{user.profile?.phoneCode}) {user.profile?.phoneNumber}
              </h2>
            </div>

            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:letter-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-all tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                {user?.email}
              </h2>
            </div>
          </div>

          <Separator orientation="vertical" className="hidden md:block mx-4 h-40 w-[0.0625rem] bg-launchingBlue-05" />

          <div className="flex flex-col gap-y-3 w-full md:w-1/2">
            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:square-academic-cap-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                wsdefefcrefgver
              </h2>
            </div>
            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:diploma-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                Vo;i9;89;0p98p;90
              </h2>
            </div>
            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:case-round-minimalistic-bold-duotone"
                className="text-display-xs text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                h5rh6yu5hu57uj
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDetail;
