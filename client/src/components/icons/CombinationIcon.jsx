import { Link } from "react-router-dom";
import { CombinationImages } from "../utils";

const CombinationIcon = ({to, images, name})=>{
    return (
        <Link to={to}>
          <div className="flex gap-2 justify-center items-center mx-4 mb-4">
            <CombinationImages
              images={images}
              name={name}
              round
              className="w-20 h-20"
            />
            <h6 className="ml-1 font-fjalla-one font-semibold text-xl md:text-3xl">
              {name}
            </h6>
          </div>
        </Link>
      );
}

export default CombinationIcon