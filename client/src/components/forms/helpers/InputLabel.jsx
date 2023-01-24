const InputLabel = ({children, required, className})=>{
    return (
        <h6 className={`text-xl font-nunito font-semibold ${className??""}`}>
            {children} {required && <span className="text-red">*</span>}
        </h6>
    );
};

export default InputLabel;