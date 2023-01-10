import { Outlet } from "react-router";
import { Header, Footer } from "../components/partials";

const DashboardLayout = () => {
  return (
    <div className="w-full min-h-screen h-auto flex flex-col justify-between">
      <Header auth="user" />
      <main className="grow overflow-x-hidden bg-white-secondary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
