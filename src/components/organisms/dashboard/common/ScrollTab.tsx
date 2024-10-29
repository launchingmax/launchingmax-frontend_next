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
  className?: string;
  renderItemAction?: (itemName?: string) => void;
}
const ScrollTab: React.FC<IProps> = ({ tabs, backUrl, renderBackBtn, className, renderItemAction }) => {
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
    <div className="px-6 ">
      <div className="w-full max-w-5xl mx-auto p-4 sticky flex flex-col gap-x-6 top-0 pb-3 bg-white dark:bg-launchingBlue-8.5 z-50">
        {/* Scrollable Container */}
        <div className="overflow-x-auto max-w-full">
          {/* Content Wrapper */}
          <div className="inline-flex space-x-4">
            {/* Individual Items */}

            <div className="flex justify-center items-center py-2">
              <div className="hidden lg:block">
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
              </div>
              <ul className={cn("flex flex-wrap justify-center space-x-12 w-full", className)}>
                {tabs.map((tab) => {
                  return (
                    <li
                      key={tab}
                      className={cn(
                        "rounded-3xl py-2 px-4 font-regular text-text-sm min-w-max",
                        activeTab === tab
                          ? "bg-launchingBlue-05 dark:bg-launchingBlue-5 text-launchingBlue-7 font-semibold text-text-md"
                          : ""
                      )}
                    >
                      {renderItemAction ? (
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            renderItemAction(tab);
                            setActiveTab(tab);
                          }}
                        >
                          {tab}
                        </div>
                      ) : (
                        <Link
                          href={`#${tab}`}
                          onClick={() => {
                            setActiveTab(tab);
                          }}
                        >
                          {tab}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" className="dark:bg-launchingBlue-15 w-full" />
    </div>
    // <div className="sticky flex flex-col max-w-full gap-x-6 top-0 pb-3 bg-white dark:bg-launchingBlue-8.5 z-50 ">
    //   <div className="flex justify-center items-center py-2">
    //     <div className="hidden lg:block">
    //       {backUrl &&
    //         (renderBackBtn ? (
    //           renderBackBtn(backUrl)
    //         ) : (
    //           <Link href={`${"/" + trimStart(backUrl, "/")}`}>
    //             <Icon
    //               icon="solar:square-alt-arrow-left-bold-duotone"
    //               className="h-8 w-8 text-launchingBlue-5 dark:text-launchingBlue-2 justify-self-start"
    //             />
    //           </Link>
    //         ))}
    //     </div>
    //     <ul className={cn("flex flex-wrap justify-center space-x-12 w-full", className)}>
    //       {tabs.map((tab) => {
    //         return (
    //           <li
    //             key={tab}
    //             className={cn(
    //               "rounded-3xl py-2 px-4 font-regular text-text-sm min-w-max",
    //               activeTab === tab
    //                 ? "bg-launchingBlue-05 dark:bg-launchingBlue-5 text-launchingBlue-7 font-semibold text-text-md"
    //                 : ""
    //             )}
    //           >
    //             {renderItemAction ? (
    //               <div
    //                 className="cursor-pointer"
    //                 onClick={() => {
    //                   renderItemAction(tab);
    //                   setActiveTab(tab);
    //                 }}
    //               >
    //                 {tab}
    //               </div>
    //             ) : (
    //               <Link
    //                 href={`#${tab}`}
    //                 onClick={() => {
    //                   setActiveTab(tab);
    //                 }}
    //               >
    //                 {tab}
    //               </Link>
    //             )}
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </div>
    //   <Separator orientation="horizontal" className="dark:bg-launchingBlue-15" />
    // </div>
  );
};

export default ScrollTab;
