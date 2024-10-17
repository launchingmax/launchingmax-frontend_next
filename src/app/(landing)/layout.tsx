import SideBar from "@/components/layout/sideBar";

export default function LandingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-backgroundDashboard dark:bg-launchingBlack p-6 gap-6">
      {/* <!-- sidebar --> */}
      <SideBar />

      {/* <!-- Main content --> */}
      <div className="flex flex-col flex-1 gap-6">
        <div className="sticky top-0 block bg-white dark:bg-launchingBlue-8.5 border-gray-200 p-[1rem] rounded-xl">
          aaa
        </div>
        <div className="overflow-y-auto bg-white dark:bg-launchingBlue-8.5 rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
