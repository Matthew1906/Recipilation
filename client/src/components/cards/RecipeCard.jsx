import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import { limitString } from "../utils";

const RecipeCard = ({ recipe }) => {
  const editRecipe = () => console.log("Edit");
  const deleteRecipe = () => console.log("Delete");
  const difficultyConfig = {
    easy: "text-yellow",
    medium: "text-orange",
    hard: "text-red",
  };
  return (
    <div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 bg-white-primary h-full rounded-2xl drop-shadow-md">
      <Link to="/recipes/classic-lasagna">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl"
        />
      </Link>
      <div className="p-5 rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl flex flex-col">
        <Link to="/recipes/classic-lasagna">
          <h6 className="text-2xl font-fjalla-one">{recipe.title}</h6>
        </Link>
        <p className="my-2 font-nunito font-light">
          {limitString(recipe.description, 100)}
        </p>
        <div className="flex justify-between">
          <div className="flex place-items-center">
            <MdTimer className="w-10 h-10 mr-1" />
            <div className="text-sm">
              <p>
                <span className="font-bold">Prep:</span>
                {recipe.prepTime}
              </p>
              <p>
                <span className="font-bold">Cook:</span>
                {recipe.cookTime}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <GiMeal className="w-10 h-10 mr-1" />
            <span>{recipe.serving} people</span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 mt-3">
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
          <div className="flex gap-1 font-bold">
            <FaTrashAlt
              className="text-red cursor-pointer link-expand"
              onClick={deleteRecipe}
            />{" "}
            <FaEdit
              className="cursor-pointer link-expand"
              onClick={editRecipe}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
