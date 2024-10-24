import { IStartup } from "@/lib/models/startup.model";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface IStartupProps {
  startup?: IStartup;
  renderAttrs?: (startup?: IStartup) => React.ReactNode;
  renderAttr?: (startup?: IStartup) => React.ReactNode;
}

const StartupCard: React.FC<IStartupProps> = ({
  startup,
  renderAttr,
  renderAttrs,
}) => {
  return (
    <div className="max-w-full rounded overflow-hidden shadow-lg rounded-b-2xl gap-6 dark:border dark:border-launchingBlue-7">
      <div
        className=" h-[17rem] w-full px-16 pb-20 relative object-cover bg-center "
        style={{
          backgroundImage:
            startup?.header ??
            "url(http://localhost:3000/assets/icons/testtest.png)",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute bottom-8 mx-auto left-0 right-0 z-10 px-20">
          <h6 className=" text-center text-launchingBlack dark:text-white text-text-xl font-bold leading-7 -tracking-tight">
            "{startup?.brainStorming.title}"
          </h6>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-launchingBlue-8 to-transparent h-full"></div>
      </div>

      {/* <div className="flex flex-col items-center w-full "> */}
      <ul className="grid grid-cols-2 justify-center pt-4 pb-5 px-6 gap-y-2 dark:bg-launchingBlue-8">
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
      {/* </div> */}
    </div>
  );
};

export default StartupCard;
