import DashSection from "@/components/organisms/dashboard/DashSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Team = () => {
  return (
    <DashSection heading="Team" className="z-0">
      <div className="flex flex-wrap justify-center gap-x-16 py-8 px-16 ">
        <div className="flex flex-col items-center">
          <Avatar className="w-[6.25rem] h-[6.25rem]">
            <AvatarImage src={`${process.env.NEXT_PUBLIC_AVATAR_API}/}`} />
            <AvatarFallback className="bg-primary-4">AA</AvatarFallback>
          </Avatar>

          <h2 className="text-text-xl font-bold text-launchingGray-8 dark:text-white leading-[1.75rem]">
            Rick wright
          </h2>
          <h2 className="text-text-md font-medium text-launchingGray-5 dark:text-launchingBlue-1.5  leading-[1.4rem]">
            Founder
          </h2>
        </div>
      </div>
    </DashSection>
  );
};

export default Team;
