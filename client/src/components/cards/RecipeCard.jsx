import { FaTrashAlt } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import { limitString } from "../../utils/string";
import { deleteRecipeFromCookbook } from "../../api/cookbook";

const RecipeCard = ({ recipe, isDraft=false, cookbook=false }) => {
  return (
    <div className="flex flex-col sm:grid sm:grid-rows-none sm:grid-cols-2 bg-white-primary h-full rounded-2xl drop-shadow-md">
      <a href={`/recipes/${recipe?.slug}${isDraft?"/edit":""}`}>
        <img
          src={recipe.image}
          alt={recipe.name}
          className="aspect-[3/2] h-full rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl"
        />
      </a>
      <div className="p-5 rounded-b-2xl sm:rounded-bl-none sm:rounded-r-2xl flex flex-col">
        <div className="flex items-center gap-2">
          <a href={`/recipes/${recipe?.slug}${isDraft?"/edit":""}`}>
            <h6 className="text-lg md:text-2xl font-fjalla-one">{recipe.name}{isDraft?' (DRAFT)':""}</h6>
          </a>
          {cookbook && <FaTrashAlt 
            className='text-red cursor-pointer' 
            onClick={()=>{
              deleteRecipeFromCookbook(cookbook, {recipe:recipe?.slug})
              window.location.reload();
            }}
          />}
        </div>
        <p className="text-sm md:text-base my-2 font-nunito font-light text-left">
          {limitString(recipe.description, 100)}
        </p>
        <div className="flex justify-between">
          <div className="flex place-items-center">
            <MdTimer className="w-10 h-10 mr-1" />
            <div className="text-xs md:text-sm">
              <p>
                <span className="font-bold">Prep:</span>
                {recipe.preparation_time}(s)
              </p>
              <p>
                <span className="font-bold">Cook:</span>
                {recipe.cooking_time}(s)
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <GiMeal className="w-10 h-10 mr-1" />
            <span className="text-xs md:sm">{recipe.serving_size} people</span>
          </div>
        </div>
        {/* <div className="flex justify-center items-center gap-3 mt-3">
          <p>
            Level:{" "}
            <span
              className={`font-bold ${
                difficultyConfig[recipe.difficulty.toLowerCase()]
              }`}
            >
              {recipe.difficulty}
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default RecipeCard;
