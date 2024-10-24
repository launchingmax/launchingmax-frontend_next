"use client";

import DashSection from "@/components/organisms/dashboard/DashSection";
import StartupCard from "@/components/organisms/dashboard/common/startupCard";
import { Button } from "@/components/ui/button";
import Fetch from "@/configs/api/fetch";
import { AppContants } from "@/lib/constants";
import { IStartup } from "@/lib/models/startup.model";
import { ILink, IPagination } from "@/lib/types/types";
import { getCookie } from "cookies-next";
//import { cookies } from "next/headers";
import { useEffect, useState } from "react";

export default function InvestorPage() {
  const [startupState, setStartupState] = useState<IPagination<IStartup>>();
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
        <div className=" w-[100%] grid grid-cols-2 gap-6">
          {startupState?.items.map((item: IStartup) => (
            <StartupCard startup={item} />
          ))}
        </div>
      </DashSection>
    </main>
  );
}
