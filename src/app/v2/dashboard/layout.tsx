import NavBar from "@/components/layout/navBar";
import SideBar from "@/components/layout/sideBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full md:p-6 md:gap-6">
      {/* <!-- sidebar --> */}
      <SideBar />

      {/* <!-- Main content --> */}
      <div className="flex flex-col min-w-[calc(100vw-18rem)] flex-1  md:gap-6">
        <NavBar />
        <div className="overflow-y-auto bg-primary-alt md:rounded-xl px-4 md:px-6 h-full p-0 m-0">{children}</div>
      </div>
    </div>
  );
}
