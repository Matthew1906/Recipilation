import { Link } from "react-router-dom";
import { Pagination } from "../../components/containers";
import { Button } from "../../components/utils";
import { recipes } from "../../utils/data";

const MyRecipes = () => {
  return (
    <>
      <div className="pt-5 px-10 flex justify-between items-center">
        <div>
          <h2 className="pt-5 font-fjalla-one text-3xl mb-3 md:mb-0">My Recipes</h2>
          <h4 className="py-2 font-nunito font-extralight text-2xl">Check out my recipes!</h4>
        </div>
        <Link to="/">
          <Button theme="yellow">New Recipe</Button>
        </Link>
      </div>
      <div className="px-10 mb-10">
        <Pagination 
          items={[...recipes, ...recipes.reverse(), ...recipes.reverse(), ...recipes.reverse()]} 
          perPage={4} 
        />
      </div>
    </>
  );
};

export default MyRecipes;
