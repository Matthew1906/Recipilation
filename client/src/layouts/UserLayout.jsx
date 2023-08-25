import { useAuth } from "../hooks";
import { Navigate, Outlet } from "react-router";

const UserLayout = ()=>{
    const {isAuthenticated, loading} = useAuth();
    if (loading){
        return "Loading" // TBA
    } else{
        return isAuthenticated? <Outlet /> : <Navigate to='/'/>
    }
}

export default UserLayout;