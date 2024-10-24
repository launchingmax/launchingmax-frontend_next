import { Button } from "@/components/ui/button";

const Overview = () => {
  return (
    <div className="p-4">
      <div className="w-full flex justify-start">
        <div
          className="w-2/3 h-auto px-16 pb-20  object-cover bg-center rounded-xl z-0"
          style={{
            backgroundImage:
              "url(http://localhost:3000/assets/icons/testtest.png)",
            // backgroundRepeat: "no-repeat",
          }}
        />

        <div className="w-1/3  px-10 space-y-4">
          <div className="flex flex-col">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-white">
              Website
            </h2>
            <h2 className="text-text-md font-medium leading-6 text-launchingGray-5 dark:text-launchingGray-2">
              ddd
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-white">
              Company size
            </h2>
            <h2 className="text-text-md font-medium leading-6 text-launchingGray-5 dark:text-launchingGray-2">
              ddd
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-white">
              Founded
            </h2>
            <h2 className="text-text-md font-medium leading-6 text-launchingGray-5 dark:text-launchingGray-2">
              ddd
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-white">
              Industry
            </h2>
            <h2 className="text-text-md font-medium leading-6 text-launchingGray-5 dark:text-launchingGray-2">
              ddd
            </h2>
          </div>

          <div className="flex flex-col">
            <h2 className="text-text-xl font-bold leading-7 text-launchingGray-8 dark:text-white">
              Headquarters
            </h2>
            <h2 className="text-text-md font-medium leading-6 text-launchingGray-5 dark:text-launchingGray-2">
              ddd
            </h2>
          </div>
        </div>
      </div>

      <h2 className="text-[2.5rem] font-bold traching-[0.125rem]  bg-gradient-to-bl from-blue-200 to-blue-900 dark:text-white bg-clip-text text-transparent leading-normal">
        Visai
      </h2>

      <p className="text-start text-text-md font-regular leading-[1.4rem] tracking-[0.02rem]">
        VisAI is your AI immigration platform, simplifying the immigration
        process. Our AI assesses your visa chances through a quick
        questionnaire, you can select your desired visa in order to know your
        chance of success. Our innovative AI not only provides your chances of
        success but also recommends alternative visa options available to you
        based on your circumstances plus it offers detailed guidance and
        insights from government sources. Trust VisAI for a stress-free
        migration experience.
      </p>

      <Button className="flex self-center ">Send Request</Button>
    </div>
  );
};

export default Overview;
