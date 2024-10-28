import DashSection from "@/components/organisms/dashboard/DashSection";
import ScrollTab from "@/components/organisms/dashboard/common/ScrollTab";
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
import { cookies } from "next/headers";
import Link from "next/link";
//import { cookies } from "next/headers";
import { useEffect, useState } from "react";

interface IStartupsParams {
  sort?: 1 | -1;
  projection?: string;
  page?: number;
  itemsCount?: number;
}

export default async function InvestorPage() {
  const tabs: string[] = ["team1", "team2", "team3", "team4"];

  //const params: IStartupsParams = { sort: 1, projection: "", page: 1, itemsCount: 20 };
  // console.log(" **************************** ", params);

  const res = await Fetch({
    url: `v1/startup`,
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
    token: cookies().get(AppContants.ParseSessionCookieName)?.value,
    //params: params,
    next: { revalidate: 1 },
  });

  // console.log(" **************************** ", JSON.stringify(res));

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
          Attend the Business Connect Summit 2023, a premier networking event for professionals, entrepreneurs, and
          executives. Gain insights from industry leaders, participate in panel discussions, and explore cutting-edge
          innovations. Network with like-minded individuals, discover potential collaborators and attend hands-on
          workshops. Don't miss this chance to thrive in the world of business!
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
          {res?.items?.map((item: IStartup) => (
            <Link href={`${"/" + trimStart(`/dashboard/investors/${item._id}/#Overview`, "/")}`}>
              <StartupCard key={item._id} startup={item} />
            </Link>
          ))}
        </div>
      </DashSection>

      <div className="py-6">
        <ScrollTab tabs={tabs} />
        <Search />
      </div>
    </main>
  );
}
