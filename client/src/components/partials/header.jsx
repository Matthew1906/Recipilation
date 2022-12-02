import { Link, NavLink } from "react-router-dom";
import Button from "../utils/Button";
import themeConfig from "../theme";

const Header = ({ auth }) => {
  return (
    <header
      className={`px-8 flex justify-between items-center w-full p-4 ${themeConfig["red"]}`}
    >
      <div className="flex justify-between items-center gap-12">
        <Link to='/'><h1 className="font-fjalla-one text-3xl">RECIPILATION</h1></Link>
        {auth != null &&       
        <ul className="flex gap-5 text font-nunito text-light">
          <a href="/">
            <li className="link-expand">Home</li>
          </a>
          <a href="/search">
            <li className="link-expand">Search</li>
          </a>
          {auth === "user" && (
            <>
              <a href="/cookbooks">
                <li className="link-expand">My Cookbooks</li>
              </a>
              <a href="/profile">
                <li className="link-expand">Profile</li>
              </a>
              <a href="/my-recipes">
                <li className="link-expand">My Recipes</li>
              </a>
            </>
          )}
        </ul>
        }
      </div>
      {auth === "user" ? (
        <Button theme="orange" expand={true}>
          LOGOUT
        </Button>
      ) : auth != null && (
        <Link to='/login'>
        <Button theme="orange" expand={true}>
          LOGIN
        </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
