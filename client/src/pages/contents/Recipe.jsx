import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaEdit, FaShareAlt, FaTrashAlt } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import { getRecipe, getRecipesByCreator } from "../../api/recipe";
import { CommentCard, RecipeCard } from "../../components/cards";
import { StepCarousel } from "../../components/carousels";
import { LoadMore, Pagination } from "../../components/containers";
import { BackIcon, RatingIcons } from "../../components/icons";
import { CommentForm } from "../../components/forms";
import { Button } from "../../components/utils";
import { comments, equipments, ingredients, steps, recipes } from "../../utils/data";
import { titleString } from "../../utils/string";
import { categoryConfig, themeConfig } from "../../utils/theme";

const randomizeTheme = () => categoryConfig[Object.keys(categoryConfig)[Math.floor(Math.random() * Object.keys(categoryConfig).length)]];

const AttributeIcon = ({ theme, children }) => {
  return (
    <div className={`${themeConfig[theme]} p-2 font-nunito flex flex-col justify-center items-center md:grid md:grid-rows-2 md:place-items-center rounded-lg drop-shadow-md`}>
      {children}
    </div>
  );
};

const Recipe = () => {
  const { slug } = useParams();
  const [ recipe, setRecipe ] = useState({});
  const [ categories, setCategories ] = useState([]);
  const [ recipesByChef, setRecipesByChef ] = useState([]);
  useEffect(()=>{
    getRecipe(slug).then(res=>{
      setRecipe(res.data);
      setCategories(res?.data?.categories.map(category=>({
        name: category.name,
        theme: randomizeTheme(),
      })));
      getRecipesByCreator(res?.data?.user?.slug).then(res=>setRecipesByChef(res.data));
    }).catch(err=>console.log(err));
  }, [slug]);
  return (
    <>
      <section id='basic-info' className="lg:grid lg:grid-cols-2 lg:h-full">
        <img src={recipe?.image??'/images/not-exist.png'} alt={slug} className="w-full h-full"/>
        <div className="p-8 lg:p-4 bg-white-primary flex flex-col justify-center items-center gap-1">
          <div className="flex justify-center items-center">
            <BackIcon className="text-2xl cursor-pointer" />
            <span className="font-fjalla-one text-2xl lg:text-4xl">{titleString(recipe?.name??slug)}</span>
            <FaTrashAlt className="ml-2 text-red cursor-pointer link-expand text-lg" />
            <FaEdit className="ml-1 cursor-pointer link-expand text-lg" />
            <FaShareAlt className="cursor-pointer link-expand text-lg" />
          </div>
          <p className="font-nunito text-extralight text-lg lg:text-xl">by {recipe?.user?.username??"Unknown"}</p>
          <div className="flex justify-center items-center gap-1">
            <RatingIcons rating={5} />
            <p className="font-light">(5)</p>
          </div>
          <p className="mt-2 md:w-96 text-center text-base md:text-xl font-extralight">
            {recipe?.description ?? "No description"}
          </p>
          <div className="my-5 px-5 md:px-10 grid grid-cols-3 gap-5">
            <AttributeIcon theme="time">
              <MdTimer className="w-12 h-12" />
              <div className="text-xs md:text-sm text-center">
                <p><strong className="mr-1">Prep:</strong>{recipe?.preparation_time??"-"}</p>
                <p><strong className="mr-1">Cook:</strong>{recipe?.cooking_time??"-"}</p>
              </div>
            </AttributeIcon>
            <AttributeIcon theme={(recipe.difficulty??"easy").toLowerCase()}>
              <BsFillBarChartFill className="w-12 h-12" />
              <p className="font-bold text-xs md:text-sm text-center">{recipe?.difficulty??"Easy"}</p>
            </AttributeIcon>
            <AttributeIcon theme="serving">
              <GiMeal className="w-12 h-12" />
              <p className="font-bold text-xs md:text-sm text-center">{recipe?.serving_size??0} people</p>
            </AttributeIcon>
          </div>
          <div className="px-4 mb-3 flex wrap justify-center gap-2">
            {categories.map((category, key) => {
              return (
                <span key={key} className={`${category.theme} px-4 py-2 rounded-md`}>
                  {category.name}
                </span>
              );
            })}
          </div>
          <div>
            <Button theme="green" expand>Add to Collection</Button>
          </div>
        </div>
      </section>
      <section id="ingredients-equipments" className="p-8 md:grid md:grid-cols-2 md:gap-6 lg:h-full bg-light-yellow">
        <div className="mb-4">
          <h6 className="text-nunito text-2xl md:text-4xl font-semibold">Equipments:</h6>
          <Pagination items={recipe?.equipments ?? equipments} type="equipment" perPage={6} smCols={2} cols={3}/>
        </div>
        <div>
          <h6 className="text-nunito text-2xl md:text-4xl font-semibold">Ingredients:</h6>
          <ul className="mt-2 px-10">
            {(recipe?.ingredients??ingredients).filter(ingredient=>ingredient!=='').map((ingredient, key) => (
              <li key={key} className="my-1 list-disc text-2xl">
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="tutorial" className="bg-white-primary text-center py-8">
        <h6 className="text-nunito text-2xl md:text-4xl mb-4">
          How to make{" "}<span className="font-semibold">{titleString(recipe?.name??slug)}</span>
        </h6>
        <StepCarousel items={recipe?.steps??steps} />
      </section>
      <LoadMore title="Comments" id="comments" className="px-10 py-8 bg-light-red" cols={3}>
        {comments.map((comment, key) => (
          <CommentCard key={key} comment = {comment}/>
        ))}
      </LoadMore>
      <CommentForm />
      <LoadMore title="More Like This" id="more-like-this" className="px-10 py-8 bg-light-yellow">
        {recipes.map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
      </LoadMore>
      <LoadMore title={"More by " + recipe?.user?.username??"Unknown"} sid="more-by-chef" className="px-10 py-8 bg-white-primary">
        {(recipesByChef??[]).filter(recipe=>recipe.slug!==slug).map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
      </LoadMore>
    </>
  );
};

export default Recipe;
