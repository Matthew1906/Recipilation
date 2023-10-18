import PropTypes from "prop-types";
import { themeConfig } from "../../utils/theme";

const Button = ({ children, theme, className, expand, onClick, type }) => {
  return (
    <button
      type={type ?? "submit"}
      className={`px-3 py-2 rounded ${themeConfig[theme]} font-nunito font-semibold tracking-wide hover:shadow-md ${expand?"link-expand":""} ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.arrayOf(PropTypes.element)]), 
  theme: PropTypes.string, 
  className: PropTypes.string, 
  expand: PropTypes.bool, 
  onClick: PropTypes.func, 
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export default Button;
