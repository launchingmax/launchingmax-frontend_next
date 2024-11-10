import DashSection from "@/components/organisms/dashboard/DashSection";
import StartupCard from "@/components/organisms/dashboard/common/startupCard";
import { IStartup } from "@/lib/models/startup.model";
import Link from "next/link";

import { NextFetch } from "@/configs/api/next-fetch";
import { trimStart } from "lodash-es";
import { Separator } from "@/components/ui/separator";
import MyProjectsList from "./myProjectsList";

export default async function MyProjectsPage() {
  //const res = await fetchData();

  return (
    <main className="w-full">
      <DashSection className="" heading="My Project">
        <p className="text-justify md:text-center text-text-md font-regular leading-[1.4rem] tracking-[0.02rem]">
          In the "My Projects" section, you can view all the projects you've invested in and have a direct connection
          with them. This section allows you to manage your investments and keep track of the status of your projects.
          You can also contact project managers from here and stay informed about any changes and updates in your
          projects.
        </p>

        <Separator orientation="horizontal" className="my-8" />

        <MyProjectsList />
      </DashSection>
    </main>
  );
}
