import { useAuth } from "../hooks";
import { Outlet } from "react-router";

const UserLayout = ()=>{
    const {isAuthenticated} = useAuth();
    return <Outlet isAuthenticated={isAuthenticated}/>
}

export default UserLayout;