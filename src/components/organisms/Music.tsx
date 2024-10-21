const Music = () => {
  return (
    <div className="flex items-center w-[21.125rem] h-[3rem] bg-launchingBlue-05 dark:bg-launchingBlue-7 rounded-md">
      <div className=" flex flex-row justify-between p-1 w-full">
        <div className="flex flex-row gap-x-2 ">
          <div className="w-10 h-10  bg-blue-400 rounded-xs"></div>
          <div className="flex flex-col ">
            <h1 className="text-sm text-launchingBlack font-medium leading-[1.135rem]">
              gewgfcwe
            </h1>
            <h1 className="text-xs text-lightBlue-5 font-medium leading-[1.135rem]">
              gewgfcwe
            </h1>
          </div>
        </div>
        <div className="flex flex-row gap-x-4 pr-4">
          <img
            className=""
            width={16}
            height={16}
            src={"/assets/icons/skip-previous-bold-duotone.svg"}
          />

          <img
            className=""
            width={32}
            height={32}
            src={"/assets/icons/play-circle-bold-duotone.svg"}
          />

          <img
            className=""
            width={16}
            height={16}
            src={"/assets/icons/skip-next-bold-duotone.svg"}
          />

          <img
            className=""
            width={16}
            height={16}
            src={"/assets/icons/volume-loud-bold-duotone.svg"}
          />
        </div>
      </div>
    </div>
  );
};

export default Music;
