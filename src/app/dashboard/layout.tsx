import NavBar from "@/components/layout/navBar";
import SideBar from "@/components/layout/sideBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen  p-6 gap-6">
      {/* <!-- sidebar --> */}
      <SideBar />

      {/* <!-- Main content --> */}
      <div className="flex flex-col flex-1 gap-6">
        <NavBar />
        <div className="overflow-y-auto bg-primary-alt rounded-xl px-6 h-full p-0 m-0">{children}</div>
      </div>
    </div>
  );
}
