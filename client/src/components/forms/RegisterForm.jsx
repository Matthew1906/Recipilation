import { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, TextInput } from "./helpers";
import { Button } from "../utils";
import { AuthIcons } from "../icons";

const RegisterForm = ({ onSubmit }) => {
  const [credential, setCredential] = useState({termsAndConditions:false});
  const changeUsername = (e) => setCredential(prevInput=>({...prevInput, username:e.target.value}));
  const changeEmail = (e) => setCredential(prevInput=>({...prevInput, email:e.target.value}));
  const changePassword = (e) => setCredential(prevInput=>({...prevInput, password:e.target.value}));
  const changeTermsAndConditions = () => setCredential(prevInput=>({...prevInput, termsAndConditions:!prevInput.termsAndConditions}));
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
        Sign Up
      </h3>
      <TextInput 
        onChange={changeUsername}
        value={credential.username || ""}
        placeholder="Username"
        className="grow text-red placeholder:text-red"
      />
      <TextInput 
        type="email" 
        onChange={changeEmail} 
        value={credential.email || ""} 
        placeholder="Email" 
        className="grow text-red placeholder:text-red"
      />
      <TextInput 
        type="password"
        onChange={changePassword}
        value={credential.password || ""}
        placeholder="Password"
        className="grow text-red placeholder:text-red"
      />
      <div className="flex justify-between">
        <Checkbox
          name="Terms and Conditions"
          checked={credential.termsAndConditions}
          onChange={changeTermsAndConditions}
        />
        <Button theme="orange" className="px-2 rounded-lg text-xs md:text-sm" expand={true}>
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
