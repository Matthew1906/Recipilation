import { Link, NavLink } from "react-router-dom";
import { Button } from "../utils";
import { themeConfig } from "../../utils/theme";

const DesktopNavigation = ({auth})=>{
    return (
        <header className={`px-8 w-full flex justify-center py-4 ${themeConfig["red"]}`}>
            <div className="max-w-[1440px] w-full flex justify-between items-center">
                <div className="flex justify-between items-center gap-12">
                    <Link to='/'><h1 className="font-fjalla-one text-3xl">RECIPILATION</h1></Link>
                    {auth != null &&   
                    <ul className="flex gap-5 text font-nunito text-light">
                        <NavLink to="/">
                            <li className="link-expand">Home</li>
                        </NavLink>
                        <NavLink to="/search">
                            <li className="link-expand">Search</li>
                        </NavLink>
                        {auth === "user" && (
                        <>
                            <NavLink to="/cookbooks">
                                <li className="link-expand">My Cookbooks</li>
                            </NavLink>
                            <NavLink to="/profile">
                                <li className="link-expand">Profile</li>
                            </NavLink>
                            <NavLink to="/my-recipes">
                                <li className="link-expand">My Recipes</li>
                            </NavLink>
                        </>
                        )}
                    </ul>
                    }
                </div>
                {auth === "user" ? (
                    <Button theme="orange" expand>
                    LOGOUT
                    </Button>
                ) : auth != null && (
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