"use client";

import CustomTabs from "@/components/organisms/dashboard/common/TabSection";
import DashSection from "@/components/organisms/dashboard/DashSection";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TabSection from "@/components/organisms/dashboard/common/TabSection";
import Overview from "./overview";
import Team from "./team";
import Market from "./market";
import Investment from "./investment";
import Documents from "./documents";
import Questions from "./questions";
import { useParams } from "next/navigation";
import Fetch from "@/configs/api/fetch";
import { getCookie } from "cookies-next";
import { AppContants } from "@/lib/constants";
import { IStartup } from "@/lib/models/startup.model";

type tabs =
  | "Overview"
  | "Team"
  | "Market"
  | "Investment"
  | "Documnets"
  | "Questions";

const StartupDetail = () => {
  const param = useParams();

  const tabs: tabs[] = [
    "Overview",
    "Team",
    "Market",
    "Investment",
    "Documnets",
    "Questions",
  ];
  const [activeTab, setActiveTab] = useState("Overview");
  const [startupDetail, setStartupDetail] = useState<IStartup>();

  const fetchData = async () => {
    const res = await Fetch({
      url: `v1/startup/${param?.startupDetail}?populate=${JSON.stringify([
        {
          path: "idea",
          populate: [
            { path: "team.user", select: "firstName lastName avatar email" },
          ],
        },
        {
          path: "supporters.supporter",
        },
      ])}`,
      method: "GET",

      token: getCookie(AppContants.ParseSessionCookieName),
      next: { revalidate: 1 },
    });
    console.log("mm 00 0 -- -   ", res);
    setStartupDetail(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTab(sectionId);
    }
  };

  return (
    <div>
      <div className=" w-full px-6 ">
        <DashSection
          heading={
            <TabSection
              tabItems={tabs}
              renderTab={handleTabClick}
              className={"w-[70%]"}
              activeTab={activeTab}
            />
          }
          backUrl="/dashboard/investor"
          showHorizontalLine={false}
          className="border-b-[1px] border-launchingBlue-1.5"
        >
          {/* Content of the page with sections */}
          <div className="space-y-8  b-0">
            {/* Add padding top to prevent content from hiding behind the sticky tabs */}
            <div className=" bg-white dark:bg-launchingBlack" id="Overview">
              <Overview />
            </div>

            <div className=" bg-white dark:bg-launchingBlack pt-20" id="Team">
              <Team />
            </div>

            <div className=" bg-white dark:bg-launchingBlack pt-20" id="Market">
              <Market />
            </div>

            <div
              className=" bg-white dark:bg-launchingBlack pt-20"
              id="Investment"
            >
              <Investment />
            </div>

            <div
              className=" bg-white dark:bg-launchingBlack pt-20"
              id="Documents"
            >
              <Documents />
            </div>

            <div
              className=" bg-white dark:bg-launchingBlack pt-20"
              id="Questions"
            >
              <Questions />
            </div>
          </div>
        </DashSection>
      </div>
    </div>
  );
};

export default StartupDetail;
