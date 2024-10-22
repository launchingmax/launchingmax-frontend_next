import NavBar from "@/components/layout/navBar";
import SideBar from "@/components/layout/sideBar";

export default function LandingLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
