import { useParams } from "react-router";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaEdit, FaShareAlt, FaTrashAlt } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import { CommentCard, RecipeCard } from "../../components/cards";
import { StepCarousel } from "../../components/carousels";
import { LoadMore, Pagination } from "../../components/containers";
import { BackIcon, RatingIcons } from "../../components/icons";
import { CommentForm } from "../../components/forms";
import { Button } from "../../components/utils";
import { useThemeCategories } from "../../hooks";
import { comments, equipments, ingredients, steps, recipes } from "../../utils/data";
import { titleString } from "../../utils/string";
import { themeConfig } from "../../utils/theme";


const AttributeIcon = ({ theme, children }) => {
  return (
    <div className={`${themeConfig[theme]} p-2 font-nunito grid grid-rows-2 place-items-center rounded-lg drop-shadow-md`}>
      {children}
    </div>
  );
};

const Recipe = () => {
  const { recipe } = useParams();
  const categories = useThemeCategories(["Lunch", "Dinner", "Western", "Pasta", "Meat"]);
  return (
    <>
      <section id='basic-info' className="grid grid-cols-2 h-screen">
        <img src="/images/lasagna-card.jpg" alt="classic-lasagna" className="w-full h-full"/>
        <div className="bg-white-primary flex flex-col justify-center items-center gap-1">
          <div className="flex justify-center items-center">
            <BackIcon className="text-2xl cursor-pointer" />
            <span className="font-fjalla-one text-4xl">{titleString(recipe)}</span>
            <FaTrashAlt className="ml-2 text-red cursor-pointer link-expand text-lg" />
            <FaEdit className="ml-1 cursor-pointer link-expand text-lg" />
            <FaShareAlt className="cursor-pointer link-expand text-lg" />
          </div>
          <p className="font-nunito text-extralight text-xl">by Ryan Raini</p>
          <div className="flex justify-center items-center gap-1">
            <RatingIcons rating={5} />
            <p className="font-light">(5)</p>
          </div>
          <p className="mt-2 w-96 text-center text-xl font-extralight">
            A great dish to make for a crowd and easy to adjust for varying
            tastes.
          </p>
          <div className="my-5 px-10 grid grid-cols-3 gap-5">
            <AttributeIcon theme="time">
              <MdTimer className="w-12 h-12" />
              <div>
                <p className="text-sm"><strong className="mr-1">Prep:</strong>12 mins</p>
                <p className="text-sm"><strong className="mr-1">Cook:</strong>2 hours</p>
              </div>
            </AttributeIcon>
            <AttributeIcon theme="easy">
              <BsFillBarChartFill className="w-12 h-12" />
              <p className="font-bold">Easy</p>
            </AttributeIcon>
            <AttributeIcon theme="serving">
              <GiMeal className="w-12 h-12" />
              <p className="font-bold">2-3 people</p>
            </AttributeIcon>
          </div>
          <div className="mb-3 flex gap-2">
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
      <section id="ingredients-equipments" className="p-8 grid grid-cols-2 gap-6 min-h-screen bg-light-yellow">
        <div>
          <h6 className="text-nunito text-4xl font-semibold">Equipments:</h6>
          <Pagination items={equipments} type="equipment" perPage={6} cols={3}/>
        </div>
        <div>
          <h6 className="text-nunito text-4xl font-semibold">Ingredients:</h6>
          <ul className="mt-2 px-10">
            {ingredients.map((ingredient, key) => (
              <li key={key} className="my-1 list-disc text-2xl">
                <span>{ingredient.amount} {ingredient.measurement} of</span>
                <span className="mx-2 font-semibold">{ingredient.name}</span>
                <span>{ingredient.details}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="tutorial" className="bg-white-primary text-center py-8">
        <h6 className="text-nunito text-4xl mb-4">
          How to make{" "}<span className="font-semibold">{titleString(recipe)}</span>
        </h6>
        <StepCarousel items={steps} />
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
      <LoadMore title="More by Ryan Raini" sid="more-by-chef" className="px-10 py-8 bg-white-primary">
        {recipes.map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
      </LoadMore>
    </>
  );
};

export default Recipe;
