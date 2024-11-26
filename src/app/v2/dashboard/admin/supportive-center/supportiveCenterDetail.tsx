"use client";

import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import { Separator } from "@/components/ui/separator";
import { ISupportiveCenter } from "@/lib/models/supportive-center.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface IProps {
  data: ISupportiveCenter;
}
const SupportiveCenterDetail: React.FC<IProps> = ({ data }) => {
  console.log(" mm 999999999999999999   ", data);
  return (
    <div className="w-[90vw] md:w-[45.5rem] ">
      <SectionTitle title={data?.name} />

      <div className="space-y-6 overflow-y-auto lg:w-full h-max md:px-8 px-4 pb-4">
        <div className="flex flex-col md:flex-row md:space-x-6 ">
          <Image
            src={
              data?.logo
                ? `${process.env.NEXT_PUBLIC_ALL_API}${data.logo}`
                : `${process.env.NEXT_PUBLIC_ALL_API}/sc/${data?.name}.png`
            }
            alt="Company Logo"
            width={200}
            height={200}
            className="w-[6.625rem] h-[6.625rem] rounded-md"
          />

          <div className="flex flex-col space-y-2">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-fg-white">About</h2>
            <h2 className="text-text-sm font-regular leading-5 text-justify text-launchingGray-7 dark:text-fg-white">
              “{data?.about}”
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md: ">
          <div className="flex flex-col gap-y-3 w-full md:w-1/2">
            <div className="flex items-center gap-x-2">
              <Icon
                icon={`twemoji:flag-${data?.country.toLowerCase().replaceAll(" ", "-")}`}
                className="text-text-xl "
              />
              <h2 className="text-text-sm font-regular tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                {data?.country}
              </h2>
            </div>

            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:map-point-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                {data?.address}
              </h2>
            </div>

            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:phone-calling-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                {data?.tel}
              </h2>
            </div>

            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:letter-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-all tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                {data?.email}
              </h2>
            </div>

            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:global-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-all tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                {data?.website}
              </h2>
            </div>
          </div>

          <Separator orientation="vertical" className="hidden md:block mx-4 h-40 w-[0.0625rem] bg-launchingBlue-05" />

          <div className="flex flex-col gap-y-3 w-full md:w-1/2">
            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:users-group-two-rounded-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                Invest
              </h2>
            </div>
            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:widget-2-bold-duotone"
                className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                Venture Capital
              </h2>
            </div>
            <div className="flex items-center gap-x-2">
              <Icon
                icon="solar:city-bold-duotone"
                className="text-display-xs text-launchingBlue-5 dark:text-launchingBlue-3"
              />
              <h2 className="text-text-sm font-regular break-words tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
                Information Technology & Services materials & Semiconductors
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportiveCenterDetail;
