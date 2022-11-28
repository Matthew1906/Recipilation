import { BsGoogle, BsMicrosoft, BsFacebook } from "react-icons/bs";
import Button from "../utils/Button";

const AuthIcons = ()=>{
    return <div className="flex justify-center gap-5">
        <Button theme='red'><BsGoogle /></Button>
        <Button theme='blue'><BsFacebook /></Button>
        <Button theme='yellow'><BsMicrosoft /></Button>
    </div>
}

export default AuthIcons;