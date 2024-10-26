import { IStartup } from "@/lib/models/startup.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface IStartupProps {
  startup?: IStartup;
  renderAttrs?: (startup?: IStartup) => React.ReactNode;
  renderAttr?: (startup?: IStartup) => React.ReactNode;
  link?: string;
}

const StartupCard: React.FC<IStartupProps> = ({
  startup,
  renderAttr,
  renderAttrs,
  link,
}) => {
  return (
    <div className="relative h-[25rem] w-full max-w-full rounded overflow-hidden shadow-lg rounded-b-2xl dark:border dark:border-launchingBlue-7 cursor-pointer">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(http://localhost:3000/assets/icons/testtest.png)`,
        }}
      >
        <ul className="absolute z-10 bottom-0 grid grid-cols-2 justify-center pt-4 pb-5 px-6 gap-y-2 dark:bg-launchingBlue-8 bg-white w-full">
          {renderAttrs ? (
            renderAttrs(startup)
          ) : (
            <>
              <li>
                <p className="flex items-center gap-x-2 text-launchingBlack dark:text-white text-text-md font-medium">
                  <Icon
                    icon="solar:tag-price-bold-duotone"
                    className="text-2xl"
                  />
                  {startup?.invFee ?? "Sample text"}
                </p>
              </li>
              <li>
                <p className="flex items-center gap-x-2 text-launchingBlack dark:text-white text-text-md font-medium">
                  <Icon
                    icon="solar:card-search-bold-duotone"
                    className="text-2xl"
                  />
                  {startup?.invFee ?? "Sample text"}
                </p>
              </li>
              <li>
                <p className="flex items-center gap-x-2 text-launchingBlack dark:text-white text-text-md font-medium">
                  <Icon icon="solar:globus-bold-duotone" className="text-2xl" />
                  {startup?.invFee ?? "Sample text"}
                </p>
              </li>
              <li>
                <p className="flex items-center gap-x-2 text-launchingBlack dark:text-white text-text-md font-medium">
                  <Icon
                    icon="solar:map-point-bold-duotone"
                    className="text-2xl"
                  />
                  {startup?.invFee ?? "Sample text"}
                </p>
              </li>
            </>
          )}
        </ul>
        <div className="absolute bottom-[30%] mx-auto left-0 right-0 z-10 px-20">
          <h6 className=" text-center text-launchingBlack dark:text-white text-text-xl font-bold leading-7 -tracking-tight">
            "{startup?.brainStorming.title}"
          </h6>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
};

export default StartupCard;
