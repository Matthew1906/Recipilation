import Button from "../utils/Button";
import themeConfig from "../theme";

const Header = ({ auth }) => {
  return (
    <header
      className={`px-8 flex justify-between items-center w-full p-3 ${themeConfig["red"]}`}
    >
      <div class="flex-grow-1 flex justify-between items-center gap-12">
        <h1 className="font-fjalla-one text-3xl">RECIPILATION</h1>
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
      </div>
      {auth === "user" ? (
        <Button link="#" theme="orange">
          LOGOUT
        </Button>
      ) : (
        <Button link="#" theme="orange">
          LOGIN
        </Button>
      )}
    </header>
  );
};

export default Header;
