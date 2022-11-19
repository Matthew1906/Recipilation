import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen h-auto flex flex-col justify-between">
        <Header auth="user" />
        <main className="flex-grow-1"></main>
        <Footer />
    </div>
  );
};

export default Dashboard;
