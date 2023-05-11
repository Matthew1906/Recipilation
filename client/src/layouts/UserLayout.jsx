import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks";

const UserLayout = ()=>{
    const { isAuthenticated } = useAuth();
    return isAuthenticated? <Outlet/>: <Navigate to='/'/>
}

export default UserLayout;