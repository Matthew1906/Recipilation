import { Outlet } from "react-router";
import { DesktopNavigation, Footer, MobileNavigation } from "../components/partials";
import { useMobile } from "../hooks";

const DashboardLayout = () => {
  const isMobile = useMobile();
  return (
    <div className="w-full min-h-screen h-auto flex flex-col justify-between">
      {isMobile===0? <MobileNavigation auth="user"/>: <DesktopNavigation auth="user"/>}
      <main className="grow overflow-x-hidden bg-white-secondary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
