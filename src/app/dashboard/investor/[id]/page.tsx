import ScrollTab from "@/components/organisms/dashboard/common/ScrollTab";
import Fetch from "@/configs/api/fetch";
import { AppContants } from "@/lib/constants";
import { cookies } from "next/headers";
import Documents from "./documents";
import Investment from "./investment";
import Market from "./market";
import Overview from "./overview";
import Questions from "./questions";
import Team from "./team";
import { IStartup } from "@/lib/models/startup.model";

type tabs = "Overview" | "Team" | "Market" | "Investment" | "Documnets" | "Questions";

const StartupDetail = async ({ params: { id } }: any) => {
  const res: IStartup = await Fetch({
    url: `v1/startup/${id}?populate=${JSON.stringify([
      {
        path: "idea",
        populate: [
          { path: "team.user", select: "firstName lastName avatar type" },
          { path: "roadmaps" },
          // { path: "userData.brainStorming" },
        ],
      },
      {
        path: "supporters.supporter",
      },
    ])}`,
    method: "GET",
    token: cookies().get(AppContants.ParseSessionCookieName)?.value,
    next: { revalidate: 1 },
  });

  console.log(" mm @@@@@@@@@@@@@@@@@@@@@@@@  ", JSON.stringify(res));
  const tabs: tabs[] = ["Overview", "Team", "Market", "Investment", "Documnets", "Questions"];

  return (
    <main>
      <div className=" bg-white dark:bg-launchingBlack">
        <ScrollTab tabs={tabs} backUrl="dashboard/investor" />
        {/* Content of the page with sections */}
        <div className="space-y-8  b-0 scroll-cubic">
          {/* Add padding top to prevent content from hiding behind the sticky tabs */}
          <section id="Overview">
            <Overview data={res} />
          </section>

          <section id="Team">
            <Team team={res.idea.team} />
          </section>

          <section id="Market">
            <Market />
          </section>

          <section id="Investment">
            <Investment />
          </section>

          <section id="Documents">
            <Documents />
          </section>

          <section id="Questions">
            <Questions />
          </section>
        </div>
      </div>
    </main>
  );
};

export default StartupDetail;
