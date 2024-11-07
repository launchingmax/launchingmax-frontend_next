"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { trimStart } from "lodash-es";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  tabs: string[];
  active?: string;
  backUrl?: string;
  renderBackBtn?: (url?: string) => React.ReactNode;
  className?: string;
  renderItemAction?: (itemName?: string) => void;
}
const ScrollTab: React.FC<IProps> = ({ tabs, active, backUrl, renderBackBtn, className, renderItemAction }) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setActiveTab(active ?? tabs[0]);
  }, [tabs, active]);

  const tabRefs = useRef<HTMLLIElement[]>([]); // Array of refs for each tab

  // Scroll the active tab into view
  useEffect(() => {
    tabRefs.current[tabs.indexOf(activeTab)]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeTab, tabs]);

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

  const scrollRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    startX = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Adjust scrolling speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="">
      <div className="md:px-12">
        {/* Scrollable Container */}
        <div
          className="overflow-x-auto scroll-hidden max-w-full cursor-grab active:cursor-grabbing"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ display: "flex" }}
        >
          {/* Content Wrapper */}
          <div className="inline-flex space-x-4">
            {/* Individual Items */}

            <div className="flex justify-center items-center py-2 gap-x-6">
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
              <ul className={cn("flex flex-wrap justify-center space-x-4 md:space-x-12 w-full", className)}>
                {tabs.map((tab, index) => {
                  return (
                    <li
                      key={tab + index}
                      //@ts-ignore
                      ref={(el) => (tabRefs.current[index] = el!)}
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
  );
};

export default ScrollTab;
