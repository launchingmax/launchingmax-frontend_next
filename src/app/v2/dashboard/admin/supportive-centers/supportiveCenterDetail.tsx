"use client";

import SectionTitle from "@/components/organisms/dashboard/common/sectionTitle";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface IProps {
  data: any;
}
const SupportiveCenterDetail: React.FC<IProps> = ({ data }) => {
  console.log(" mm 999999999999999999   ", data);
  return (
    <div className="w-[41.5rem] space-y-6">
      <SectionTitle title={data.name} />

      <div className="flex flex-row space-x-6">
        <Image
          src={`${process.env.NEXT_PUBLIC_ALL_API}/ideas/65f6a15c58bda0151f8cfd95/vb/f4985ed7-2302-44bf-ac6b-bc17388a108e.png`}
          alt="Company Logo"
          width={200}
          height={200}
          className="w-[6.625rem] h-[6.625rem]"
        />

        <div className="flex flex-col space-y-2">
          <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-fg-white">jvwsgfwer</h2>
          <h2 className="text-text-sm font-regular leading-5 text-justify text-launchingGray-7 dark:text-fg-white">
            “ KLA is a Venture capital that develops industry-leading equipment and services that enable innovation
            throughout the electronics industry. It provides advanced process control and process-enabling solutions for
            manufacturing wafers and reticles, integrated circuits, packaging, printed circuit boards, and flat panel
            displays. ”
          </h2>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col gap-y-3 w-1/2">
          <div className="flex items-center gap-x-2">
            <Icon icon={`twemoji:flag-iran`} className="text-text-xl " />
            <h2 className="text-text-sm font-regular tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
              Iran
            </h2>
          </div>

          <div className="flex items-center gap-x-2">
            <Icon
              icon="solar:map-point-bold-duotone"
              className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
            />
            <h2 className="text-text-sm font-regular tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
              Three Technology Drive, Milpitas, California 95035, USA
            </h2>
          </div>

          <div className="flex items-center gap-x-2">
            <Icon
              icon="solar:phone-calling-bold-duotone"
              className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
            />
            <h2 className="text-text-sm font-regular tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
              (+1)408 875 3000
            </h2>
          </div>

          <div className="flex items-center gap-x-2">
            <Icon
              icon="solar:letter-bold-duotone"
              className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
            />
            <h2 className="text-text-sm font-regular tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
              kevin.kessel@kla.com
            </h2>
          </div>

          <div className="flex items-center gap-x-2">
            <Icon
              icon="solar:global-bold-duotone"
              className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
            />
            <h2 className="text-text-sm font-regular tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
              www.kla.com
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-y-3 w-1/2">
          <div className="flex items-center gap-x-2">
            <Icon
              icon="solar:users-group-two-rounded-bold-duotone"
              className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
            />
            <h2 className="text-text-sm font-regular tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
              Invest
            </h2>
          </div>
          <div className="flex items-center gap-x-2">
            <Icon
              icon="solar:widget-2-bold-duotone"
              className="text-text-xl text-launchingBlue-5 dark:text-launchingBlue-3"
            />
            <h2 className="text-text-sm font-regular tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
              Venture Capital
            </h2>
          </div>
          <div className="flex items-center gap-x-2">
            <Icon
              icon="solar:city-bold-duotone"
              className="text-display-xs text-launchingBlue-5 dark:text-launchingBlue-3"
            />
            <h2 className="text-text-sm font-regular tracking-[0.00875rem] leading-[1.1375rem] text-launchingGray-6 dark:text-fg-white">
              Information Technology & Services materials & Semiconductors
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportiveCenterDetail;
