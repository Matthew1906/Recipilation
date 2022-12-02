import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import CombinationImages from "../utils/CombinationImages";

const CombinationCard = ({ cookbook, to, name, images, recipes }) => {
    return (
        <div className="flex bg-white-primary rounded-2xl drop-shadow-md">
            <div className="w-1/2 h-full">
                <CombinationImages
                    images={images}
                    name={name}
                    round={false}
                    className='w-full h-full object-contain'
                />
            </div>
          <div className="p-5 flex flex-col justify-center">
            <h6 className="text-2xl font-fjalla-one flex items-center gap-1">{`${name} Food`} {cookbook?<span className="text-red cursor-pointer"><FaTrashAlt /></span>:""}</h6>
            <p className="mt-2 font-nunito font-light text-xl">
                {recipes} recipes
            </p>
            <Link to={cookbook?`/cookbooks/${name.tolowerCase()}`:`/categories/${name.toLowerCase()}`}>
            <p className="mt-1 font-nunito font-light text-xl text-red underline">
                Check it out
            </p>
            </Link>
          </div>
        </div>
    );
};

export default CombinationCard;
