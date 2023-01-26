import { Outlet } from "react-router";
import { DesktopNavigation, Footer, MobileNavigation } from "../components/partials";
import { useScreenSize } from "../hooks";

const DashboardLayout = () => {
  const screenSize = useScreenSize();
  return (
    <div className="w-full min-h-screen h-auto flex flex-col justify-between items-center">
      {screenSize===0? <MobileNavigation auth="user"/>: <DesktopNavigation auth="user"/>}
      <main className="max-w-[1440px] w-full grow overflow-x-hidden bg-white-secondary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
