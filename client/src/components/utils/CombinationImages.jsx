const CombinationImages = ({ images, name, round, className }) => {
  const borderRadius = [
    (key) => ["rounded-full"][key], // for the sake of consistency
    (key) => ["rounded-l-full", "rounded-r-full"][key],
    (key) => ["rounded-tl-full", "rounded-tr-full", "rounded-b-full"][key],
    (key) =>
      [
        "rounded-tl-full",
        "rounded-tr-full",
        "rounded-bl-full",
        "rounded-br-full",
      ][key],
  ];
  return (
    <div className={`grid grid-cols-${images.length > 1 ? 2 : 1} object-contain ${className}`}>
      {images.map((image, key) => (
        <img
          src={`${image}`}
          alt={`${name}-${key}`}
          key={key}
          className={`w-full h-full ${
            images.length === 3 && key === images.length - 1 ? "col-span-2" : ""
          } ${round ? borderRadius[images.length - 1](key) : ""}`}
        />
      ))}
    </div>
  );
};

export default CombinationImages;
