import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Checkbox, TextInput } from "./helpers";
import { Button } from "../utils";
import { AuthIcons } from "../icons";

const RegisterForm = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues:{
      username:'', 
      email:'', 
      password:'', 
      termsAndConditions:false
    }
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-64 md:w-96 px-6 py-4 lg:py-8 lg:px-12 bg-white-primary flex flex-col gap-4 rounded-xl shadow-lg"
    >
      <h3 className="font-fjalla-one text-center text-3xl lg:text-5xl text-red font-medium md:mb-5">
        Sign Up
      </h3>
      <TextInput  
        control={control}
        name="username"
        placeholder="Username"
        className="grow text-red placeholder:text-red"
      />
      <TextInput 
        type="email" 
        control={control}
        name="email"
        placeholder="Email" 
        className="grow text-red placeholder:text-red"
      />
      <TextInput 
        type="password"
        control={control}
        name="password"
        placeholder="Password"
        className="grow text-red placeholder:text-red"
      />
      <div className="flex justify-between">
        <Checkbox name="termsAndConditions" label="Terms and Conditions" control={control}/>
        <Button theme="orange" className="px-2 rounded-lg text-xs md:text-sm" expand>
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
