import { useState } from "react";
import AuthIcons from "./AuthIcons";
import Button from "../utils/Button";
import Checkbox from "./Checkbox";
import TextInput from "./TextInput";
import { Link } from "react-router-dom";

const RegisterForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const changeUsername = (e) => setUsername(e.target.value);
  const [email, setEmail] = useState("");
  const changeEmail = (e) => setEmail(e.target.value);
  const [password, setPassword] = useState("");
  const changePassword = (e) => setPassword(e.target.value);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const changeTermsAndConditions = () =>
    setTermsAndConditions(!termsAndConditions);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, password, termsAndConditions });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-64 md:w-96 px-6 py-4 lg:py-8 lg:px-12 bg-white-primary flex flex-col gap-4 rounded-xl shadow-lg"
    >
      <h3 className="font-fjalla-one text-center text-3xl lg:text-5xl text-red font-medium md:mb-5">
        Sign Up
      </h3>
      <TextInput
        type="text"
        changeInput={changeUsername}
        inputValue={username}
        placeholder="Username"
      />
      <TextInput
        type="text"
        changeInput={changeEmail}
        inputValue={email}
        placeholder="Email"
      />
      <TextInput
        type="password"
        changeInput={changePassword}
        inputValue={password}
        placeholder="Password"
      />
      <div className="flex justify-between">
        <Checkbox
          name="Terms and Conditions"
          checked={termsAndConditions}
          onChange={changeTermsAndConditions}
        />
        <Button theme="orange" className="px-7 rounded-lg text-xs md:text-sm">
          Sign Up
        </Button>
      </div>
      <p className="text-sm md:text-base text-red text-light text-center">
        or, register with
      </p>
      <AuthIcons />
      <span className="text-sm md:text-base text-red text-center">
        Already have an account?
        <Link to="/login">
          <span className="text-black font-semibold ml-1">Login Now!</span>
        </Link>
      </span>
    </form>
  );
};

export default RegisterForm;
