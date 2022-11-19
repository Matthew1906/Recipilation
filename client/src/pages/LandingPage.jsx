import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen h-auto flex">
      <div className="w-3/5 h-screen flex flex-col justify-between bg-white-secondary">
        <Header auth="landing" />
        <main className="flex-grow-1"></main>
        <Footer />
      </div>
      <div className="w-2/5 h-screen">
        <img
          src="/images/bg-landing.jpg"
          alt="Recipilation Background"
          srcset=""
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default LandingPage;
