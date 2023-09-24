import { GiMeal } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import { limitString } from "../../utils/string";

const RecipeCard = ({ recipe, isDraft=false }) => {
  return (
    <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 bg-white-primary h-full rounded-2xl drop-shadow-md">
      <a href={`/recipes/${recipe?.slug}${isDraft?"/edit":""}`}>
        <img
          src={recipe.image}
          alt={recipe.name}
          className="aspect-[3/2] h-full rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl"
        />
      </a>
      <div className="p-5 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl flex flex-col">
        <a href={`/recipes/${recipe?.slug}${isDraft?"/edit":""}`}>
          <h6 className="text-2xl font-fjalla-one">{recipe.name}{isDraft?' (DRAFT)':""}</h6>
        </a>
        <p className="my-2 font-nunito font-light">
          {limitString(recipe.description, 100)}
        </p>
        <div className="flex justify-between">
          <div className="flex place-items-center">
            <MdTimer className="w-10 h-10 mr-1" />
            <div className="text-sm">
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
            <span>{recipe.serving_size} people</span>
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
