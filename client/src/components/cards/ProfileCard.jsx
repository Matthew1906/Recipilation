import { Link } from "react-router-dom";
import { RatingIcons } from "../icons";

const ProfileCard = ({profile}) => {
  const {username:name, image, recipes, rating, reviews} = profile;
  return (
    <Link to={"/"}>
      <div className="rounded-l-full flex justify-between gap-5 bg-white-primary drop-shadow-lg">
        <img src={image} alt={name} className="rounded-full w-36 h-36" />
        <div className="grow flex flex-col justify-center">
          <p className="mb-1 font-fjalla-one text-2xl">{name}</p>
          <div className="flex items-center gap-2">
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
                <span>({reviews})</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
