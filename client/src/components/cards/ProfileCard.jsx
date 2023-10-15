import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RatingIcons } from "../icons";

const ProfileCard = ({profile}) => {
  const {username:name, image, recipes, rating, reviews, slug } = profile;
  return (
    <Link to={"/profiles/"+ slug}>
      <div className="rounded-l-full flex justify-between gap-2 sm:gap-5 bg-white-primary drop-shadow-lg">
        <img src={image??"/images/not-exist.jpg"} alt={name} className="rounded-full w-36 h-36" />
        <div className="grow flex flex-col justify-center text-sm md:text-base">
          <p className="mb-1 font-fjalla-one text-xl sm:text-2xl">{name}</p>
          <div className="sm:flex sm:items-center sm:gap-2">
            <span className="font-nunito font-light">
              {recipes === 0 ? "No recipes" : `${recipes} dishes`}
            </span>
            {recipes !== 0 && rating === 0 ? (
              <span className="font-nunito font-extralight">(Unrated)</span>
            ) : recipes === 0 && rating === 0 ? (
              ""
            ) : (
              <>
                <RatingIcons rating={rating} />
                <span className="text-xs sm:text-sm">({reviews})</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.object
};

export default ProfileCard;
