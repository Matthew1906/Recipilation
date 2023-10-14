import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../utils";
import { logout } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import { themeConfig } from "../../utils/theme";
import { slugifyString } from "../../utils/string";


const MobileNavigation = ({ purpose='home' }) => {
    const { user, isAuthenticated } = useAuth();
    const [dropdown, setDropdown] = useState(false);
    const display = ()=>setDropdown(!dropdown);
    return (
        <header className={`w-full ${themeConfig["red"]}`}>
            <div className="px-8 py-4 flex justify-between items-center gap-12">
                <Link to="/">
                    <h1 className="font-fjalla-one text-3xl">RECIPILATION</h1>
                </Link>
                {purpose!=='auth' && <button onClick={display} className="relative">
                    <BiMenu  className="w-10 h-10"/>
                </button>}
            </div>
            {purpose!=='auth' && (
            <ul className={`${themeConfig["red"]} pb-4 px-8 w-full absolute z-50 ${dropdown ? "block" : "hidden"}`}>
                <NavLink to="/"><li className="mb-4">Home</li></NavLink>
                <NavLink to="/search"><li className="mb-4">Search</li></NavLink>
                {isAuthenticated && 
                    <>
                    <NavLink to="/cookbooks">
                        <li className="mb-4">My Cookbooks</li>
                    </NavLink>
                    <NavLink to={`/profiles/${slugifyString(user.displayName)}`}>
                        <li className="mb-4">My Profile</li>
                    </NavLink>
                    </>
                }
                {purpose!=='auth' && isAuthenticated ? (
                    <a href="/"><Button theme="orange" expand onClick={logout}>LOGOUT</Button></a>
                ) : (purpose!=='auth' && (
                    <Link to="/login">
                        <Button theme="orange" expand>LOGIN</Button>
                    </Link>
                ))}
            </ul>
            )}
        </header>
    );
};

export default MobileNavigation;