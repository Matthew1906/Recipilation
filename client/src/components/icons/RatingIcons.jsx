import { FaStar } from "react-icons/fa";

const RatingIcons = ({ rating }) => {
  return (
    <div className="flex items-center text-yellow gap-1">
      {Array(rating)
        .fill("star")
        .map((val, key) => (
          <FaStar key={val+key} />
        ))}
    </div>
  );
};

export default RatingIcons;
