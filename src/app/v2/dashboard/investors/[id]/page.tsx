import ScrollTab from "@/components/organisms/dashboard/common/ScrollTab";
import Documents from "./documents";
import Overview from "./overview/overview";
import Team from "./team";
import { Suspense } from "react";
import { NextFetch } from "@/configs/api/next-fetch";
import DashSection from "@/components/organisms/dashboard/DashSection";
import { IStartup } from "@/lib/models/startup.model";
import Link from "next/link";
import StartupCard from "@/components/organisms/dashboard/common/startupCard";
import { isEmpty, trimStart } from "lodash-es";

type tabs = "Overview" | "Team" | "Market" | "Investment" | "Documents";

async function fetchStartupData(id: { id: string }) {
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
      console.log(".... 4444444444444444444  .....   ", data.idea);
      return data;
    }
  } catch (error: any) {
    throw error;
  }
}

async function fetchRelatedStartupsData(industry: string) {
  const body = JSON.stringify({ industries: industry });
  try {
    const response = await NextFetch(`v1/startup/search`, { method: "POST", body: body });
    //const response = await NextFetch(`v1/startup`, { method: "GET" });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    throw error;
  }
}

const StartupDetail = async ({ params: { id } }: any) => {
  const res = await fetchStartupData(id);

  const relatedStartups = await fetchRelatedStartupsData(res.businessPlan.industry);

  let tabs: tabs[] = ["Overview", "Team", "Market", "Investment", "Documents"];

  if (!res.idea.businessPlan.investment) tabs = tabs.filter((item: string) => item !== "Investment");

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
            <section id="Overview" className="pt-4">
              <Overview data={res} />
            </section>

            <section id="Team" className="pt-14">
              <Team team={res.idea.team} />
            </section>

            <section id="Market">
              <DashSection heading="Market" className="z-0">
                <div
                  dangerouslySetInnerHTML={{ __html: res.idea.businessPlan.market ?? "" }}
                  className="text-start text-text-md font-regular leading-[1.4rem] tracking-[0.02rem] whitespace-pre-wrap"
                />
              </DashSection>
            </section>

            {res.idea.businessPlan.investment && (
              <section id="Investment">
                <DashSection heading="Investment" className="z-0">
                  <div
                    dangerouslySetInnerHTML={{ __html: res.idea.businessPlan.investment ?? "" }}
                    className="text-start text-text-md font-regular leading-[1.4rem] tracking-[0.02rem] whitespace-pre-wrap"
                  />
                </DashSection>
              </section>
            )}

            <section id="Documents">
              <Documents data={res} />
            </section>

            <div>
              <DashSection
                heading={
                  <h2 className="px-6 font-bold text-[2rem] tracking-wide text-launchingBlue-8 dark:text-white">
                    <em>Related startups</em>
                  </h2>
                }
              />
            </div>

            <div className="w-full flex flex-wrap  justify-center 2xl:px-8 pb-12">
              {relatedStartups.length > 0 ? (
                relatedStartups?.items?.map((item: IStartup) => (
                  <div className="w-[100%] xl:w-[45%] m-3">
                    <Link href={`${"/" + trimStart(`/v2/dashboard/investors/${item._id}/#Overview`, "/")}`}>
                      <StartupCard key={item._id} startup={item} />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="w-[100%] flex justify-center">
                  <h2 className="text-display-sm">There is No Related Startup !</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
};

export default StartupDetail;
