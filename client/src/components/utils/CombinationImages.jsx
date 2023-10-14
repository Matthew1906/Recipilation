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
    <>
    {images.length>0
    ? <div className={`grid grid-cols-${images.length > 1 ? 2 : 1} object-contain ${className??""}`}>
    {images.map((image, key) => (
      <img
        src={`${image}`}
        alt={`${name}-${key}`}
        key={key}
        className={`aspect-[3/2] w-full h-full ${round ? borderRadius[images.length - 1](key) : ""}`}
      />
    ))}
    </div>
    : <img src="/images/not-exist.jpg" alt="Empty cookbook" className={`aspect-[3/2] w-full h-full ${className}`}/>
  }
    </>
    
  );
};

export default CombinationImages;
