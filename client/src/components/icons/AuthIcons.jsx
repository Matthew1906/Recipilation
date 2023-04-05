import { useNavigate } from "react-router";
import { BsGoogle, BsFacebook, BsMicrosoft, BsTwitter } from "react-icons/bs";
import { loginWithGoogle, registerOAuth, logout, loginWithFacebook } from "../../api/auth";
import { Button } from "../utils";

const AuthIcons = ({purpose})=>{
    const navigate = useNavigate();
    const googleHandler = ()=>{
        if(purpose === 'login'){
            loginWithGoogle()
                .then((res)=>{
                    const user = res.user;
                    registerOAuth({ username: user.displayName, email:user.email })
                        .then(()=>navigate("/"))
                        .catch((err)=>console.log(err))
                }).catch((err)=>console.log(err.message));
        } else if(purpose ==='register'){
            loginWithGoogle()
                .then((res)=>{
                    const user = res.user;
                    registerOAuth({ username: user.displayName, email:user.email })
                        .then(()=>logout().then(()=>navigate("/")))
                        .catch((err)=>console.log(err))
                }).catch((err)=>console.log(err.message));
        }
    }
    const facebookHandler = ()=>{
        if(purpose === 'login'){
            loginWithFacebook()
                .then((res)=>{
                    const user = res.user;
                    registerOAuth({ username: user.displayName, email:user.email })
                        .then(()=>navigate("/"))
                        .catch((err)=>console.log(err))
                }).catch((err)=>console.log(err.message));
        } else if(purpose ==='register'){
            loginWithFacebook()
                .then((res)=>{
                    const user = res.user;
                    registerOAuth({ username: user.displayName, email:user.email })
                        .then(()=>logout().then(()=>navigate("/")))
                        .catch((err)=>console.log(err))
                }).catch((err)=>console.log(err.message));
        }
    }
    return <div className="flex justify-center gap-5">
        <Button theme='red' type='button' onClick={googleHandler}><BsGoogle /></Button>
        <Button theme='blue' type='button' onClick={facebookHandler}><BsFacebook /></Button>
        <Button theme='yellow' type='button' ><BsMicrosoft /></Button>
    </div>
}

export default AuthIcons;