import TooltipWrapper from "@/components/molecules/TooltipWrapper";
import { IStartup } from "@/lib/models/startup.model";
import { formatNumberWithCommas } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface IStartupProps {
  startup?: IStartup;
  renderAttrs?: (startup?: IStartup) => React.ReactNode;
  renderAttr?: (startup?: IStartup) => React.ReactNode;
  link?: string;
}

const StartupCard: React.FC<IStartupProps> = ({ startup, renderAttr, renderAttrs, link }) => {
  return (
    <div className="relative h-[25rem] w-full max-w-full rounded overflow-hidden shadow-lg rounded-b-2xl dark:border dark:border-launchingBlue-7 cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_ALL_API}${startup?.visualBranding?.cover})`,
        }}
      >
        <div className="absolute bottom-[30%] mx-auto left-0 right-0 z-[1] px-20">
          <h6 className=" text-center text-launchingBlack dark:text-white text-text-xl font-bold leading-7 -tracking-tight">
            "{startup?.brainStorming.title}"
          </h6>

          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Icon icon="solar:tag-price-bold-duotone" className="text-2xl text-launchingGray-6" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-launchingBlue-8" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-launchingBlue-8" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 dark:to-launchingBlue-8" />
      </div>
      <ul className="absolute  bottom-0 grid grid-cols-2 justify-center pt-4 pb-5 px-2 sm:px-6 gap-y-2 w-full">
        {renderAttrs ? (
          renderAttrs(startup)
        ) : (
          <>
            <li className="w-max">
              <TooltipWrapper
                title="Max startup value"
                tooltipTrigger={
                  <p className="flex items-center gap-x-2 text-launchingBlack dark:text-white text-text-md font-medium ">
                    <Icon icon="solar:tag-price-bold-duotone" className="text-2xl text-launchingGray-6" />
                    {/* ${startup?.minStartupValue && formatNumberWithCommas(startup?.minStartupValue)} - $ */}$
                    {startup?.maxStartupValue && formatNumberWithCommas(startup?.maxStartupValue)}
                  </p>
                }
              />
            </li>
            <li className="w-max">
              <TooltipWrapper
                title="investment fee"
                tooltipTrigger={
                  <p className="flex items-center gap-x-2 text-launchingBlack dark:text-white text-text-md font-medium">
                    <Icon icon="solar:card-search-bold-duotone" className="text-2xl text-launchingGray-6" />$
                    {(startup?.investmentFee && formatNumberWithCommas(startup?.investmentFee)) ?? ""}
                  </p>
                }
              />
            </li>
            <li>
              <p className="flex items-center gap-x-2 text-launchingBlack dark:text-white text-text-md font-medium">
                <Icon icon="solar:buildings-3-bold-duotone" className="text-2xl text-launchingGray-6" />
                {startup?.industries ?? "Sample text"}
              </p>
            </li>
            <li>
              <p className="flex items-center gap-x-2 text-launchingBlack dark:text-white text-text-md font-medium">
                <Icon icon="solar:map-point-bold-duotone" className="text-2xl text-launchingGray-6" />
                {startup?.placement?.[0]?.country ?? ""}
                <Icon icon={`twemoji:flag-${startup?.placement?.[0]?.country.toLowerCase().replaceAll(" ", "-")}`} />
              </p>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default StartupCard;
