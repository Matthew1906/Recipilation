import themeConfig from "../theme";

const Button = ({ children, theme, className }) => {
  return (
    <button
      className={`px-3 py-2 rounded ${themeConfig[theme]} font-nunito font-semibold tracking-wide hover:shadow-md link-expand ${className && className}`}
    >
      {children}
    </button>
  );
};

export default Button;
