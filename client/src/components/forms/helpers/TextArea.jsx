const TextArea = ({rows, onChange, value, className})=>{
    return (
        <textarea 
            rows={rows} 
            value={value} 
            onChange={onChange} 
            className={`p-4 w-full border-red rounded-lg bg-white-primary ${className || ""}`}
        />
    )
};

export default TextArea;