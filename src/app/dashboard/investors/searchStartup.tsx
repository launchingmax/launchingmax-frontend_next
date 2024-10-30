"use client";
import ScrollTab from "@/components/organisms/dashboard/common/ScrollTab";
import Search from "@/components/organisms/dashboard/common/search";
import StartupCard from "@/components/organisms/dashboard/common/startupCard";
import StartupFilter from "@/components/organisms/investor/startupFilter";
import { Input } from "@/components/ui/input";
import Fetch from "@/configs/api/fetch";
import { AppContants } from "@/lib/constants";
import { IIndustry } from "@/lib/models/industries.model";
import { IStartup } from "@/lib/models/startup.model";
import { IPagination } from "@/lib/types/types";
import { getCookie } from "cookies-next";
import { trimStart } from "lodash-es";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IStartupsParams {
  sort?: { [key: string]: 1 | -1 };
  projection?: string;
  page?: number;
  itemsCount?: number;
}

export default function SearchStartup() {
  const token = getCookie(AppContants.ParseSessionCookieName); //cookies().get(AppContants.ParseSessionCookieName)?.value,

  const [filteredStartup, setFilteredStartUp] = useState<IPagination<IStartup>>();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [tabs, setTabs] = useState<string[]>(["All Industry"]);

  const params: IStartupsParams = {
    sort: { createdAt: 1 },
    // projection: "firstName lastName avatar email",
    page: 1,
    itemsCount: 20,
  };
  console.log(" ***************  Params  ************* ", params);

  const fetchIndustry = async () => {
    const res = await Fetch({ url: "/v1/industry", method: "GET", token: token, next: { revalidate: 1 } });
    setTabs((tabs) => [...tabs, ...res.items.map((item: any) => item.name)]);
  };
  useEffect(() => {
    fetchIndustry();
  }, []);

  const fetchData = async () => {
    const query = `${selectedTab === "All Industry" ? "" : `industries=/${selectedTab}/`}`;
    const res = await Fetch({
      url: `v1/startup?${query}`,
      //?populate=${JSON.stringify([
      // {
      //   path: "idea",
      //   populate: [
      //     { path: "team.user", select: "firstName lastName avatar email" },
      //   ],
      // },
      // {
      //   path: "tags",
      // },
      //])}
      method: "GET",
      token: token,
      // params: params,
    });
    setFilteredStartUp(res);
    console.log(" ***************  Res  *************   ", res);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  return (
    <div className="py-6">
      <ScrollTab
        tabs={tabs}
        renderItemAction={(item) => setSelectedTab(item ?? "")}
        className="flex flex-nowrap overflow-x-scroll scroll-hidden"
      />
      <Search dialogBody={<StartupFilter />} />

      <div className="w-full flex  justify-center px-8 space-x-4">
        {filteredStartup?.items?.map((item: IStartup) => (
          <div className="w-[100%] lg:w-[45%] ">
            <Link href={`${"/" + trimStart(`/dashboard/investors/${item._id}/#Overview`, "/")}`}>
              <StartupCard key={item._id} startup={item} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
