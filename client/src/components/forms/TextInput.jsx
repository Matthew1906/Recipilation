const TextInput = ({ placeholder, type, changeInput, inputValue }) => {
  return (
    <input
      type={type}
      onChange={changeInput}
      value={inputValue}
      placeholder={placeholder}
      className="bg-white-primary border-red border rounded-md p-2 text-red placeholder:text-red text-sm md:text-base"
    />
  );
};

export default TextInput;
