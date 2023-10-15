import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { FcGoogle} from "react-icons/fc";
import { Button } from "../utils";
import { loginWithGoogle, registerOAuth, logout } from "../../api/auth";
import { useFormStatus } from "../../hooks";

const AuthIcons = ({purpose})=>{
    const navigate = useNavigate();
    const { displayFormError } = useFormStatus();
    const googleHandler = ()=>{
        if(purpose === 'login'){
            loginWithGoogle()
                .then((res)=>{
                    const user = res.user;
                    registerOAuth({ username: user.displayName, email:user.email })
                        .then(()=>navigate("/"))
                        .catch((err)=>displayFormError(err))
                }).catch((err)=>displayFormError(err.message));
        } else if(purpose ==='register'){
            loginWithGoogle()
                .then((res)=>{
                    const user = res.user;
                    registerOAuth({ username: user.displayName, email:user.email })
                        .then(()=>logout().then(()=>navigate("/")))
                        .catch((err)=>displayFormError(err))
                }).catch((err)=>displayFormError(err.message));
        }
    }
    return <div className="flex justify-center gap-5">
        <Button theme='neutral' type='button' onClick={googleHandler} className='drop-shadow-lg flex justify-between items-center gap-4'>
            <FcGoogle /> 
            <p className="text-sm font-semibold">{ purpose === 'login' ?'Sign In with Google' : 'Sign Up with Google'}</p> 
        </Button>
    </div>
}

AuthIcons.propTypes = {
    purpose: PropTypes.string
}

export default AuthIcons;