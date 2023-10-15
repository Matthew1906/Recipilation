import { Link, NavLink } from "react-router-dom";
import { Button } from "../utils";
import { logout } from "../../api/auth";
import { useAuth } from "../../hooks";
import { themeConfig } from "../../utils/theme";
import { slugifyString } from "../../utils/string";

const DesktopNavigation = ({purpose='home'})=>{
    const { user, isAuthenticated } = useAuth();
    return (
        <header className={`px-8 w-full flex justify-center py-4 ${themeConfig["red"]}`}>
            <div className="max-w-[1440px] w-full flex justify-between items-center">
                <div className="flex justify-between items-center gap-12">
                    <Link to='/'><h1 className="font-fjalla-one text-3xl">RECIPILATION</h1></Link>
                    {purpose!=='auth' &&   
                    <ul className="flex gap-5 text font-nunito text-light">
                        <NavLink to="/">
                            <li className="link-expand">Home</li>
                        </NavLink>
                        <NavLink to="/search">
                            <li className="link-expand">Search</li>
                        </NavLink>
                        {purpose!=='auth' && isAuthenticated && 
                            <>
                            <NavLink to="/cookbooks">
                                <li className="link-expand">My Cookbooks</li>
                            </NavLink>
                            <NavLink to={`/profiles/${slugifyString(user.displayName)}`}>
                                <li className="link-expand">My Profile</li>
                            </NavLink>
                            </>
                        }
                    </ul>
                    }
                </div>
                {purpose!=='auth' && isAuthenticated ? (
                    <a href="/"><Button theme="orange" expand onClick={logout}>LOGOUT</Button></a>
                ) : purpose!=='auth' && (
                    <Link to='/login'>
                        <Button theme="orange" expand>
                            LOGIN
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default DesktopNavigation;