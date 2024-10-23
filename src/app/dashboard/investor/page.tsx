import DashSection from "@/components/organisms/dashboard/DashSection";
import StartupCard from "@/components/organisms/dashboard/common/startupCard";
import { Button } from "@/components/ui/button";
import { ILink } from "@/lib/types/types";

export default async function InvestorPage() {
  return (
    <main className="w-full">
      <DashSection
        className=""
        // backUrl="/dashboard"
        heading="Startups"
        //cta={<Button>My Requests</Button>}
        cta={new ILink("My resquest", "/href")}
      >
        <p className="text-center px-8 text-text-md font-regular leading-6 tracking-wide">
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
        <StartupCard />
      </DashSection>
    </main>
  );
}
