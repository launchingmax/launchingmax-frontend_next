"use client";

import CustomTabs from "@/components/organisms/dashboard/common/TabSection";
import DashSection from "@/components/organisms/dashboard/DashSection";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TabSection from "@/components/organisms/dashboard/common/TabSection";
import Overview from "./overview";

type tabs =
  | "Overview"
  | "Team"
  | "Market"
  | "Investment"
  | "Documnets"
  | "Contacts";

const StartupDetail = () => {
  const tabs: tabs[] = [
    "Overview",
    "Team",
    "Market",
    "Investment",
    "Documnets",
    "Contacts",
  ];
  const [activeTab, setActiveTab] = useState("Overview");

  const handleTabClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveTab(sectionId);
    }
  };

  return (
    <div>
      <div className="relative top-0 left-0  w-full">
        <DashSection
          heading={
            <TabSection
              tabItems={tabs}
              renderTab={handleTabClick}
              className={"w-[50%]"}
              activeTab={activeTab}
            />
          }
          backUrl="/dashboard/investor"
          showHorizontalLine={false}
          className="border-b-[1px] border-launchingBlue-1.5"
        >
          {/* Content of the page with sections */}
          <div className="space-y-8 h-[clac(100vh-10rem)] b-0">
            {/* Add padding top to prevent content from hiding behind the sticky tabs */}
            <div
              className="h-screen bg-white dark:bg-launchingBlack pt-10"
              id="Overview"
            >
              <Overview />
            </div>

            <div
              className="h-screen bg-white dark:bg-launchingBlack pt-20"
              id="section2"
            >
              <h2 className="text-4xl p-8">Section 2</h2>
              <p>Content for Section 2</p>
            </div>

            <div
              className="h-screen bg-white dark:bg-launchingBlack pt-20"
              id="section3"
            >
              <h2 className="text-4xl p-8">Section 3</h2>
              <p>Content for Section 3</p>
            </div>
          </div>
        </DashSection>
      </div>
    </div>
  );
};

export default StartupDetail;
