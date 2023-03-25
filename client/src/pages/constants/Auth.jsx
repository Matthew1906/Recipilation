import { LoginForm, RegisterForm } from "../../components/forms";
import { DesktopNavigation, Footer, MobileNavigation } from "../../components/partials";
import { useScreenSize } from "../../hooks";

const Auth = ({ purpose }) => {
  const screenSize = useScreenSize();
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      {screenSize===0? <MobileNavigation purpose='auth'/>: <DesktopNavigation purpose='auth'/>}
      <main
        style={{ backgroundImage: "url('/images/bg-auth.jpg')" }}
        className="min-h-screen h-auto flex justify-center items-start bg-cover py-8 px-32 lg:py-16 lg:px-64"
      >
        {purpose === "login" ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
