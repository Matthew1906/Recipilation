import themeConfig from "../theme";

const Button = ({ link, children, theme }) => {
  return (
    <a
      href={link}
      className={`px-3 py-2 rounded ${themeConfig[theme]} font-nunito font-semibold tracking-wide hover:shadow-md link-expand`}
    >
      {children}
    </a>
  );
};

export default Button;
