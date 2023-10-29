import PropTypes from "prop-types";

const InputLabel = ({children, required, className})=>{
    return (
        <h6 className={`text-xl font-nunito font-semibold ${className??""}`}>
            {children} {required && <span className="text-red">*</span>}
        </h6>
    );
};

InputLabel.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    className: PropTypes.string,
    required: PropTypes.bool
}

export default InputLabel;