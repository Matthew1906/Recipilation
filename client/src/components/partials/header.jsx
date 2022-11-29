import { Link, NavLink } from "react-router-dom";
import Button from "../utils/Button";
import themeConfig from "../theme";

const Header = ({ auth }) => {
  return (
    <header
      className={`px-8 flex justify-between items-center w-full p-4 ${themeConfig["red"]}`}
    >
      <div className="flex-grow-1 flex justify-between items-center gap-12">
        <Link to='/'><h1 className="font-fjalla-one text-3xl">RECIPILATION</h1></Link>
        {auth != null &&       
        <ul className="flex gap-5 text font-nunito text-light">
          <a href="/">
            <li className="link-expand">Home</li>
          </a>
          <a href="/">
            <li className="link-expand">Search</li>
          </a>
          {auth === "user" && (
            <>
              <a href="/">
                <li className="link-expand">My Cookbooks</li>
              </a>
              <a href="/">
                <li className="link-expand">Profile</li>
              </a>
              <a href="/">
                <li className="link-expand">My Recipes</li>
              </a>
            </>
          )}
        </ul>
        }
      </div>
      {auth === "user" ? (
        <Button theme="orange">
          LOGOUT
        </Button>
      ) : auth != null && (
        <Link to='login'>
        <Button theme="orange">
          LOGIN
        </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;