"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { trimStart } from "lodash-es";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IProps {
  tabs: string[];
  backUrl?: string;
  renderBackBtn?: (url?: string) => React.ReactNode;
}
const ScrollTab: React.FC<IProps> = ({ tabs, backUrl, renderBackBtn }) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveTab(hash);
    };

    // Scroll on initial load if there's a hash in the URL
    handleHashChange();

    // Listen for hash changes to handle subsequent changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [router]);

  return (
    <div className=" sticky flex flex-col  w-full gap-x-6 top-0 pb-3 bg-white dark:bg-launchingBlack z-50">
      <div className="flex justify-center items-center py-2">
        {backUrl &&
          (renderBackBtn ? (
            renderBackBtn(backUrl)
          ) : (
            <Link href={`${"/" + trimStart(backUrl, "/")}`}>
              <Icon
                icon="solar:square-alt-arrow-left-bold-duotone"
                className="h-8 w-8 text-launchingBlue-5 dark:text-launchingBlue-2 justify-self-start"
              />
            </Link>
          ))}

        <ul className="flex justify-center space-x-12 w-full">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={cn(
                "rounded-3xl py-2 px-4 font-regular text-text-sm",
                activeTab === tab
                  ? "bg-launchingBlue-05 dark:bg-launchingBlue-5 text-launchingBlue-7 font-semibold text-text-md"
                  : ""
              )}
            >
              <Link href={`#${tab}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Separator orientation="horizontal" className="dark:bg-launchingBlue-15" />
    </div>
  );
};

export default ScrollTab;
