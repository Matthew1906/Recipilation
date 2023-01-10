import { themeConfig } from "../../utils/theme";

const Button = ({ children, theme, className, expand }) => {
  return (
    <button
      className={`px-3 py-2 rounded ${themeConfig[theme]} font-nunito font-semibold tracking-wide hover:shadow-md ${expand?"link-expand":""} ${className && className}`}
    >
      {children}
    </button>
  );
};

export default Button;
