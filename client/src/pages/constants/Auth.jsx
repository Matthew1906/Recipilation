import { LoginForm, RegisterForm } from "../../components/forms";
import { Header, Footer } from "../../components/partials";

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
