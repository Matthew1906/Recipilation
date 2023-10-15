import PropTypes from "prop-types";
import { FaStar, FaStarHalf } from "react-icons/fa";

const RatingIcons = ({ rating }) => {
  return (
    <div className="flex items-center text-yellow gap-1">
      {Array(Math.floor(rating))
        .fill("star")
        .map((val, key) => (
          <FaStar key={val+key} />
        ))}
      {(rating*2)%2!==0 && <FaStarHalf key={1000}/>}
    </div>
  );
};

RatingIcons.propTypes = {
  rating: PropTypes.number
}

export default RatingIcons;
