import ScrollTab from "@/components/organisms/dashboard/common/ScrollTab";
import Documents from "./documents";
import Investment from "./investment";
import Market from "./market";
import Overview from "./overview/overview";
import Questions from "./questions";
import Team from "./team";
import { Suspense } from "react";
import { NextFetch } from "@/configs/api/next-fetch";

type tabs = "Overview" | "Team" | "Market" | "Investment" | "Documents" | "Questions";

async function fetchData(id: { id: string }) {
  try {
    const response = await NextFetch(
      `v1/startup/${id}?populate=${JSON.stringify([
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
      ])}`
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    throw error;
  }
}

const StartupDetail = async ({ params: { id } }: any) => {
  const res = await fetchData(id);

  const tabs: tabs[] = ["Overview", "Team", "Market", "Investment", "Documents", "Questions"];

  return (
    <main>
      <Suspense
        fallback={<h2 className="text-display-2xl text-red-500 tracking-widest "> ..... L O A D I N G ..... </h2>}
      >
        <div className="flex flex-col bg-white dark:bg-launchingBlue-8.5">
          <ScrollTab tabs={tabs} backUrl="/v2/dashboard/investors" />
          {/* Content of the page with sections */}
          <div className="space-y-8  b-0 scroll-cubic ">
            {/* Add padding top to prevent content from hiding behind the sticky tabs */}
            <section id="Overview" className="pt-16">
              <Overview data={res} />
            </section>

            <section id="Team" className="pt-14">
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
      </Suspense>
    </main>
  );
};

export default StartupDetail;
