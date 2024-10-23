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
    <div className=" max-w-[50%] rounded overflow-hidden shadow-lg">
      <div
        className=" h-[17rem] w-full  flex items-end justify-start px-16 pb-20 relative"
        style={{
          backgroundImage:
            startup?.header ??
            "url(http://localhost:3000/assets/icons/testtest.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "cover",
        }}
      >
        <div className="absolute bottom-8 mx-auto left-0 right-0 z-10 px-20">
          <h6 className=" text-center text-3xl font-bold">
            {"this is a long title of a startup"}
          </h6>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-full"></div>
      </div>

      <div className="flex flex-col items-center w-full 300">
        <ul className="grid grid-cols-2">
          {renderAttrs ? (
            renderAttrs(startup)
          ) : (
            <>
              <li>
                <p className="flex items-center gap-x-2">
                  <Icon icon="material-symbols:money-bag" />
                  {startup?.invFee ?? "Sample text"}
                </p>
              </li>
              <li>
                <p className="flex items-center gap-x-2">
                  <Icon icon="material-symbols:money-bag" />
                  {startup?.invFee ?? "Sample text"}
                </p>
              </li>
              <li>
                <p className="flex items-center gap-x-2">
                  <Icon icon="material-symbols:money-bag" />
                  {startup?.invFee ?? "Sample text"}
                </p>
              </li>
              <li>
                <p className="flex items-center gap-x-2">
                  <Icon icon="material-symbols:money-bag" />
                  {startup?.invFee ?? "Sample text"}
                </p>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StartupCard;
