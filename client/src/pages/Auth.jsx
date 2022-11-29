import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

const Auth = ({ purpose }) => {
  const handleSubmit = (input) => console.log(input);
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Header />
      <main
        style={{ backgroundImage: "url('/images/bg-auth.jpg')" }}
        className="min-h-screen h-auto flex justify-center items-start bg-cover py-8 px-32 lg:py-16 lg:px-64"
      >
        {purpose === "login" ? (
          <LoginForm onSubmit={handleSubmit} />
        ) : (
          <RegisterForm onSubmit={handleSubmit} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
