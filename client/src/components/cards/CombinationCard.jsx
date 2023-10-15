import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CombinationImages } from "../utils";
import { slugifyString } from "../../utils/string";

const CombinationCard = ({ cookbook=false, name, images, recipes }) => {
    return (
        <div className="flex bg-white-primary drop-shadow-md">
            <div className="w-1/2 h-full">
                <CombinationImages
                    images={images}
                    name={name}
                    round={false}
                    className='w-full h-full max-h-48 object-scale-down'
                />
            </div>
          <div className="p-5 flex flex-col justify-center">
            <h6 className="text-xl sm:text-2xl font-fjalla-one flex items-center gap-1">{cookbook?`${name}`:`${name} food`}</h6>
            <p className="mt-2 font-nunito font-light text-md sm:text-lg">
                {recipes} recipes
            </p>
            <Link to={cookbook?`/cookbooks/${slugifyString(name.toLowerCase())}`:`/categories/${name.toLowerCase()}`}>
            <p className="mt-1 font-nunito font-light text-md sm:text-lg text-red underline">
                Check it out
            </p>
            </Link>
          </div>
        </div>
    );
};

CombinationCard.propTypes = {
    cookbook:PropTypes.bool,
    name:PropTypes.string,
    images:PropTypes.arrayOf(PropTypes.string),
    recipes:PropTypes.number,
}

export default CombinationCard;
