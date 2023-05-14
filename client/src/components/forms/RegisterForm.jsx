import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useFormStatus } from "../../hooks";
import { Checkbox, TextInput } from "./helpers";
import { Button } from "../utils";
import { AuthIcons } from "../icons";
import { register } from "../../api/auth";

const RegisterForm = () => {
  const { control, handleSubmit, formState:{errors}, reset } = useForm({
    defaultValues:{
      username:'', 
      email:'', 
      password:'', 
      termsAndConditions:false
    }
  });
  const navigate = useNavigate();
  const { status, displayFormError, resetFormError }= useFormStatus();
  const onSubmit = input=>{
    resetFormError();
    register(input).then(()=>navigate("/")).catch((err)=>{
      reset();
      displayFormError(err.code);
    });
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-64 md:w-96 px-6 py-4 lg:py-8 lg:px-12 bg-white-primary flex flex-col gap-4 rounded-xl shadow-lg"
    >
      <h3 className="font-fjalla-one text-center text-3xl lg:text-5xl text-red font-medium md:mb-5">
        SIGN UP
      </h3>
      { status !== false && <p className="text-orange font-semibold">{status}</p>}
      <TextInput  
        control={control}
        name="username"
        placeholder="Username"
        className="grow text-red placeholder:text-red"
      />
      <ErrorMessage errors={errors} name="username" render={({ message }) => <p className="-mt-2 text-sm text-right text-orange">{message}</p>}/>
      <TextInput 
        type="email" 
        control={control}
        name="email"
        placeholder="Email" 
        className="grow text-red placeholder:text-red"
      />
      <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="-mt-2 text-sm text-right text-orange">{message}</p>}/>
      <TextInput 
        type="password"
        control={control}
        name="password"
        placeholder="Password"
        className="grow text-red placeholder:text-red"
      />
      <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="-mt-2 text-sm text-right text-orange">{message}</p>}/>
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col gap-2 items-start">
          <Checkbox name="termsAndConditions" label="Terms and Conditions" control={control} required/>
          <ErrorMessage errors={errors} name="termsAndConditions" render={({ message }) => <p className="-mt-2 text-sm text-right text-orange">{message}</p>}/>
        </div>
        <Button theme="orange" className="grow px-2 rounded-lg text-sm" expand>
          Sign Up
        </Button>
      </div>
      <p className="text-sm md:text-base text-red text-light text-center">
        or, register with
      </p>
      <AuthIcons purpose='register'/>
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
