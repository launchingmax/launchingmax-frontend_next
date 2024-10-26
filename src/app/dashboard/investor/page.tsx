"use client";

import DashSection from "@/components/organisms/dashboard/DashSection";
import TabSection from "@/components/organisms/dashboard/common/TabSection";
import Search from "@/components/organisms/dashboard/common/search";
import StartupCard from "@/components/organisms/dashboard/common/startupCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Fetch from "@/configs/api/fetch";
import { AppContants } from "@/lib/constants";
import { IStartup } from "@/lib/models/startup.model";
import { ILink, IPagination } from "@/lib/types/types";
import { getCookie } from "cookies-next";
import { trimStart } from "lodash-es";
import Link from "next/link";
//import { cookies } from "next/headers";
import { useEffect, useState } from "react";

export default function InvestorPage() {
  const [startupState, setStartupState] = useState<IPagination<IStartup>>();

  const tabs: string[] = ["team1", "team2", "team3", "team4"];

  const fetchStartupData = async () => {
    const res: IPagination<IStartup> = await Fetch({
      url: "v1/startup",
      method: "GET",
      token: getCookie(AppContants.ParseSessionCookieName), //cookies().get(AppContants.ParseSessionCookieName),
      next: { revalidate: 1 },
    });
    setStartupState(res);
    console.log("mm 2020- -    ", res);
  };
  useEffect(() => {
    fetchStartupData();
  }, []);

  const [activeTab, setActiveTab] = useState("team1");

  const handleTabClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTab(sectionId);
    }
  };

  return (
    <main className="w-full">
      <DashSection
        className=""
        // backUrl="/dashboard"
        heading="Startups"
        //cta={<Button>My Requests</Button>}
        cta={new ILink("My resquest", "/href")}
      >
        <p className="text-center px-8 text-text-md font-regular leading-[1.4rem] tracking-[0.02rem]">
          Attend the Business Connect Summit 2023, a premier networking event
          for professionals, entrepreneurs, and executives. Gain insights from
          industry leaders, participate in panel discussions, and explore
          cutting-edge innovations. Network with like-minded individuals,
          discover potential collaborators and attend hands-on workshops. Don't
          miss this chance to thrive in the world of business!
        </p>
      </DashSection>

      <DashSection
        className=""
        heading={
          <h2 className="font-bold text-2xl tracking-wide text-launchingBlue-5 dark:text-white">
            <em>Top Startups</em>
          </h2>
        }
      >
        <div className=" w-[100%] grid grid-cols-2 gap-6 ">
          {startupState?.items.map((item: IStartup) => (
            <Link
              href={`${
                "/" + trimStart(`/dashboard/investor/${item._id}`, "/")
              }`}
            >
              <StartupCard key={item._id} startup={item} />
            </Link>
          ))}
        </div>
      </DashSection>

      <div className="py-6">
        <DashSection
          heading={
            <TabSection
              tabItems={tabs}
              className={"w-full items-start"}
              renderTab={handleTabClick}
              activeTab={activeTab}
            />
          }
          showHorizontalLine={false}
        >
          <div>
            <Separator
              orientation="horizontal"
              className="dark:bg-launchingBlue-15"
            />
            <Search />
            <div className="space-y-8  b-0">
              {/* Add padding top to prevent content from hiding behind the sticky tabs */}
              <div
                className="h-screen bg-white dark:bg-launchingBlack pt-10"
                id="team1"
              >
                <h2 className="text-4xl p-8">Team1</h2>
                <p>Content for Section 2</p>
              </div>
              <div
                className="h-screen bg-white dark:bg-launchingBlack pt-20"
                id="team2"
              >
                <h2 className="text-4xl p-8">team2</h2>
                <p>Content for Section 2</p>
              </div>

              <div
                className="h-screen bg-white dark:bg-launchingBlack pt-20"
                id="team3"
              >
                <h2 className="text-4xl p-8">team3</h2>
                <p>Content for Section 3</p>
              </div>
            </div>
          </div>
        </DashSection>
      </div>
    </main>
  );
}
