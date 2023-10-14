import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks";

const UserLayout = ()=>{
    const {isAuthenticated, loading} = useAuth();
    if (loading){
        return "Loading" // TBA
    } else{
        return isAuthenticated? <Outlet /> : <Navigate to='/'/>
    }
}

export default UserLayout;