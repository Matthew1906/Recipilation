const TextInput = ({ placeholder, type, changeInput, inputValue, className,}) => {
  return (
    <input
      type={type}
      onChange={changeInput}
      value={inputValue}
      placeholder={placeholder || ""}
      className={`grow bg-white-primary border-red border rounded-md px-3 py-2 text-red placeholder:text-red text-sm md:text-base ${
        className ? className : ""
      }`}
    />
  );
};

export default TextInput;
