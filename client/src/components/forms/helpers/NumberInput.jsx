const NumberInput = ({value, onChange, className})=>{
    return (
        <input 
            type='number' 
            value={value} 
            onChange={onChange} 
            className={`bg-white-primary border-red border rounded-md px-3 py-2 text-sm md:text-base text-black ${className}`}
        />
    )
};

export default NumberInput;