import DashSection from "@/components/organisms/dashboard/DashSection";
import StartupCard from "@/components/organisms/dashboard/common/startupCard";
import { IStartup } from "@/lib/models/startup.model";
import Link from "next/link";
import SearchStartup from "./searchStartup";
import MyDialog from "@/components/molecules/MyDialog";
import { Button } from "@/components/ui/button";
import MyRequests from "@/components/organisms/investor/MyRequests";
import { NextFetch } from "@/configs/api/next-fetch";
import { trimStart } from "lodash-es";
interface IStartupsParams {
  sort?: 1 | -1;
  projection?: string;
  page?: number;
  itemsCount?: number;
}

async function fetchData() {
  try {
    const response = await NextFetch(
      `v1/startup?populate=${JSON.stringify([
        {
          path: "idea",
          populate: [{ path: "team.user", select: "firstName lastName avatar email" }],
        },
      ])}`
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    throw error;
  }
}

export default async function InvestorPage() {
  //const params: IStartupsParams = { sort: 1, projection: "", page: 1, itemsCount: 20 };
  //console.log(" **************************** ", params);

  const res = await fetchData();

  console.log(".... ressssss  .....   ", res);

  // try {
  //   const res = await fetchData();
  // } catch (error) {
  //   return <div></div>;
  // }

  return (
    <main className="w-full">
      <DashSection
        className=""
        // backUrl="/dashboard"
        heading="Startups"
        //cta={<Button>My Requests</Button>}  {new ILink("My resquest", "/href")}
        cta={
          <MyDialog
            dialogTrigger={
              <Button className="w-max " variant={"secondaryColor"} size={"sm"}>
                My resquest
              </Button>
            }
            body={<MyRequests />}
            className={{ dialogContent: "w-full !max-w-[60vw] bg-transparent border-none" }}
          ></MyDialog>
        }
      >
        <p className="text-justify md:text-center text-text-md font-regular leading-[1.4rem] tracking-[0.02rem]">
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
        <div className=" w-[100%] grid xl:grid-cols-2 grid-cols-1 gap-6 ">
          {res?.items?.map((item: IStartup) => {
            console.log(".... item isTop   ", item);
            if (item.isTop)
              return (
                <Link href={`${"/" + trimStart(`/v2/dashboard/investors/${item._id}/#Overview`, "/")}`}>
                  <StartupCard key={item._id} startup={item} />
                </Link>
              );
          })}
        </div>
      </DashSection>

      <SearchStartup />
    </main>
  );
}