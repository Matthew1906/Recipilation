import { themeConfig } from "../../utils/theme";

const Button = ({ children, theme, className, expand, onClick, type }) => {
  return (
    <button
      type={type ?? "submit"}
      className={`px-3 py-2 rounded ${themeConfig[theme]} font-nunito font-semibold tracking-wide hover:shadow-md ${expand?"link-expand":""} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
