import { IStartup } from "@/lib/models/startup.model";
import RequestButton from "./requestButton";

const Overview = ({ data }: { data: IStartup }) => {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row justify-start gap-5">
        <div
          className=" lg:h-auto h-[300px] w-full lg:w-2/3 inset-0 bg-cover bg-center rounded-xl z-0"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_ALL_API}${data?.visualBranding?.cover})`,
          }}
        />

        <div className="w-full lg:w-1/3  px-10 gap-y-4 grid md:grid-cols-2 lg:grid-cols-1">
          <div className="flex flex-col">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-white">Website</h2>
            <h2 className="text-text-md font-medium leading-6 text-launchingGray-5 dark:text-launchingGray-2">
              {data?.idea?.website?.website}
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-white">Company size</h2>
            <h2 className="text-text-md font-medium leading-6 text-launchingGray-5 dark:text-launchingGray-2">
              {data?.idea?.team?.length < 10
                ? "2-10"
                : data?.idea?.team?.length < 50
                ? "10-50"
                : data?.idea?.team?.length < 250
                ? "50-250"
                : "250-500"}{" "}
              employees
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-white">Founded</h2>
            <h2 className="text-text-md font-medium leading-6 text-launchingGray-5 dark:text-launchingGray-2">ddd</h2>
          </div>
          <div className="flex flex-col">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-white">Industry</h2>
            <h2 className="text-text-md font-medium leading-6 text-launchingGray-5 dark:text-launchingGray-2">
              {data?.idea?.businessPlan?.industry}
            </h2>
          </div>

          <div className="flex flex-col">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-white">Headquarters</h2>
            <h2 className="text-text-md font-medium leading-6 text-launchingGray-5 dark:text-launchingGray-2">
              {data?.idea?.businessPlan?.country}
            </h2>
          </div>
        </div>
      </div>

      <h2 className="text-[2.5rem] font-bold traching-[0.125rem]  bg-gradient-to-bl from-blue-200 to-blue-900 dark:text-white bg-clip-text text-transparent leading-normal">
        {data?.idea?.brainStorming?.title}
      </h2>

      <div
        dangerouslySetInnerHTML={{ __html: data?.idea?.brainStorming?.desc ?? "" }}
        className="text-start text-text-md font-regular leading-[1.4rem] tracking-[0.02rem] whitespace-pre-wrap"
      />

      <div className=" flex justify-center w-full mt-6">
        <RequestButton investors={data?.investors} />
      </div>
    </>
  );
};

export default Overview;
