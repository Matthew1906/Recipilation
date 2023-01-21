import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { Checkbox, TextInput } from "./helpers";
import { Button}  from "../utils";
import { AuthIcons } from "../icons";

const LoginForm = ({ onSubmit }) => {
  const { control, handleSubmit, formState:{errors} } = useForm({
    defaultValues:{
      email:'', 
      password:'', 
      rememberMe:false
    }
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-64 md:w-96 px-6 py-4 lg:py-8 lg:px-12 bg-white-primary flex flex-col gap-4 rounded-xl shadow-lg"
    >
      <h3 className="font-fjalla-one text-center text-3xl lg:text-5xl text-red font-medium md:mb-5">
        LOGIN NOW
      </h3>
      <TextInput 
        type="email" 
        control={control}
        name="email"
        placeholder="Email" 
        className="grow text-red placeholder:text-red"
      />
      <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="-mt-2 text-sm text-right text-black">{message}</p>}/>
      <TextInput 
        type="password"
        control={control}
        name="password"
        placeholder="Password"
        className="grow text-red placeholder:text-red"
      />
      <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="-mt-2 text-sm text-right text-black">{message}</p>}/>
      <div className="flex justify-between">
        <Checkbox name="rememberMe" label="Remember Me" control={control}/>
        <Button theme="orange" className="px-7 rounded-lg text-xs md:text-sm" expand>
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
