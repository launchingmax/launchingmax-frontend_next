import DashSection from "@/components/organisms/dashboard/DashSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ITeam } from "@/lib/submodels/Team";

const Team = ({ team }: { team: ITeam[] }) => {
  return (
    <DashSection heading="Team" className="z-0">
      <div className="flex flex-wrap justify-center gap-x-16 py-8 px-16 ">
        {team.map((item: ITeam) => (
          <div className="flex flex-col items-center">
            <Avatar className="w-[6.25rem] h-[6.25rem] mb-2">
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_ALL_API}${item.user.avatar}`}
                //src={`${process.env.NEXT_PUBLIC_ALL_API}/${item.user.avatar}`}
              />
              <AvatarFallback className="bg-primary-4">
                {item.user.firstName.charAt(0)} {item.user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <h2 className="text-text-xl font-bold text-launchingGray-8 dark:text-white leading-[1.75rem]">
              {item.user.firstName} {item.user.lastName}
            </h2>
            <h2 className="text-text-md font-medium text-launchingGray-5 dark:text-launchingBlue-1.5  leading-[1.4rem]">
              {item.user.type}
            </h2>
          </div>
        ))}
      </div>
    </DashSection>
  );
};

export default Team;
