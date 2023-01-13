import { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import TextInput from "./TextInput";
import { Button}  from "../utils";
import { AuthIcons } from "../icons";

const LoginForm = ({ onSubmit }) => {
  const [credential, setCredential] = useState({rememberMe:false});
  const changeEmail = (e) => setCredential(prevInput=>({...prevInput, email:e.target.value}));
  const changePassword = (e) => setCredential(prevInput=>({...prevInput, password:e.target.value}));
  const changeRememberMe = () => setCredential(prevInput=>({...prevInput, rememberMe:!prevInput.rememberMe}));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(credential);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-64 md:w-96 px-6 py-4 lg:py-8 lg:px-12 bg-white-primary flex flex-col gap-4 rounded-xl shadow-lg"
    >
      <h3 className="font-fjalla-one text-center text-3xl lg:text-5xl text-red font-medium md:mb-5">
        LOGIN NOW
      </h3>
      <TextInput
        type="text"
        changeInput={changeEmail}
        inputValue={credential.email || ""}
        placeholder="Email"
      />
      <TextInput
        type="password"
        changeInput={changePassword}
        inputValue={credential.password || ""}
        placeholder="Password"
      />
      <div className="flex justify-between">
        <Checkbox
          name="Remember Me"
          checked={credential.rememberMe}
          onChange={changeRememberMe}
        />
        <Button theme="orange" className="px-7 rounded-lg text-xs md:text-sm" expand={true}>
          Login
        </Button>
      </div>
      <p className="text-sm md:text-base text-red text-light text-center">
        or, continue with
      </p>
      <AuthIcons />
      <span className="text-sm md:text-base text-red text-center">
        Don't have an account?
        <Link to="/register">
          <span className="text-black font-semibold ml-1">Sign Up Now!</span>
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
