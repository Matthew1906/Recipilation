import { useParams } from "react-router";
import { BsFillBarChartFill, /*BsDownload*/ } from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { GiMeal } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import { CommentCard, RecipeCard } from "../../components/cards";
import { StepCarousel } from "../../components/carousels";
import { LoadMore, Pagination } from "../../components/containers";
import { CommentForm } from "../../components/forms";
import { BackIcon, RatingIcons } from "../../components/icons";
import { SelectCookbookModal, ShareModal } from "../../components/modals";
import { useAuth, useHistory, useSingleRecipe } from "../../hooks";
import { titleString } from "../../utils/string";
import { themeConfig } from "../../utils/theme";

const AttributeIcon = ({ theme, children }) => {
  return (
    <div className={`${themeConfig[theme]} p-2 font-nunito flex flex-col justify-center items-center md:grid md:grid-rows-2 md:place-items-center rounded-lg drop-shadow-md`}>
      {children}
    </div>
  );
};

AttributeIcon.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
}

const Recipe = () => {
  const { slug } = useParams();
  const { isAuthenticated, user } = useAuth();
  const { saveHistory } = useHistory();
  saveHistory(slug);
  const {
    categories, recipe, 
    updateRecipe, deleteRecipe, refreshRecipe,
    similarRecipes, recipesByChef,
    validReviewer, updateReview, deleteReview
  } = useSingleRecipe(slug);
  return (
    <>
      <section id='basic-info' className="lg:grid lg:grid-cols-2 lg:h-full">
        <img src={recipe?.image??'/images/not-exist.jpg'} alt={slug} className="w-full h-full aspect-[3/2]"/>
        <div className="p-8 bg-white-primary flex flex-col justify-center items-center gap-1">
          <div className="flex justify-center items-center">
            <BackIcon className="text-2xl cursor-pointer" />
            <span className="font-fjalla-one text-xl sm:text-2xl lg:text-4xl">{titleString(recipe?.name??slug)}</span>
            {user?.displayName === recipe?.user?.username &&
            <>            
            <FaTrashAlt className="ml-2 text-red cursor-pointer link-expand text-lg" onClick={deleteRecipe}/>
            <FaEdit className="ml-1 cursor-pointer link-expand text-lg" onClick={updateRecipe}/>
            </>}
            <ShareModal link={`${process.env.REACT_APP_URL}/recipes/${recipe?.slug}`} title={recipe?.title}/>
            {/* <BsDownload className="ml-1 cursor-pointer link-expand text-lg" onClick={
              ()=>downloadRecipe(recipe?.slug).then(res=>{
                const file = new Blob([res.data], { type: "application/pdf" });
                const fileURL = URL.createObjectURL(file);
                const a = document.createElement("a");
                a.href=fileURL;
                a.title= `${recipe?.slug}.pdf`;
                a.target="_blank";
                a.click();
              })
            }/> */}
          </div>
          <a 
            href={('/profiles/'+recipe?.user?.slug)??"#"} 
            className="font-nunito text-extralight md:text-lg lg:text-xl hover:underline"
          >
            by {recipe?.user?.username??"Unknown"}
          </a>
          <div className="text-sm sm:text-base flex justify-center items-center gap-1">
            <RatingIcons rating={recipe?.avg_rating??0} />
            <p className="font-light">({recipe?.reviews?.length??0})</p>
          </div>
          <p className="mt-2 md:w-96 text-center text-xs sm:text-base md:text-xl font-extralight">
            {recipe?.description ?? "No description"}
          </p>
          <div className="my-5 px-5 md:px-10 grid grid-cols-3 gap-5">
            <AttributeIcon theme="time">
              <MdTimer className="w-12 h-12" />
              <div className="text-xs md:text-sm text-center">
                <p><strong className="mr-1">Prep:</strong>{recipe?.preparation_time??"-"}(s)</p>
                <p><strong className="mr-1">Cook:</strong>{recipe?.cooking_time??"-"}(s)</p>
              </div>
            </AttributeIcon>
            <AttributeIcon theme={(recipe.difficulty??"easy").toLowerCase()}>
              <BsFillBarChartFill className="w-12 h-12" />
              <p className="font-bold text-xs md:text-sm text-center">{titleString(recipe?.difficulty??"easy")}</p>
            </AttributeIcon>
            <AttributeIcon theme="serving">
              <GiMeal className="w-12 h-12" />
              <p className="font-bold text-xs md:text-sm text-center">{recipe?.serving_size??0} people</p>
            </AttributeIcon>
          </div>
          <div className="px-4 mb-3 flex flex-wrap justify-center gap-2">
            {categories.map((category, key) => {
              return (
                <span key={key} className={`${category.theme} px-4 py-2 rounded-md flex justify-center items-center text-xs md:text-base`}>
                  {category.name}
                </span>
              );
            })}
          </div>
          {isAuthenticated &&
          <div>
            <SelectCookbookModal recipe={recipe?.slug}/>
          </div>
          }
        </div>
      </section>
      <section id="ingredients-equipments" className="p-8 md:grid md:grid-cols-2 md:gap-6 lg:h-full bg-light-yellow">
        <div className="mb-4">
          <h6 className="text-nunito text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold">Equipments:</h6>
          <Pagination items={recipe?.equipments??[]} type="equipment" perPage={6} smCols={2} cols={3}/>
        </div>
        <div>
          <h6 className="text-nunito text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold">Ingredients:</h6>
          <ul className="mt-2 px-10">
            {(recipe?.ingredients??[]).filter(ingredient=>ingredient!=='').map((ingredient, key) => (
              <li key={key} className="my-1 list-disc text-sm sm:text-lg md:text-xl lg:text-2xl">
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="tutorial" className="bg-white-primary text-center py-8">
        <h6 className="text-nunito text-lg sm:text-xl md:text-2xl lg:text-4xl mb-4">
          How to make{" "}<span className="font-semibold">{titleString(recipe?.name??slug)}</span>
        </h6>
        <StepCarousel items={recipe?.steps??[]} />
      </section>
      <LoadMore title="Comments" id="comments" className="px-10 py-8 bg-light-red" cols={3}>
        {(recipe?.reviews??[]).map((review, key) => (
          <CommentCard 
            key={key} 
            comment = {review} 
            deleteAction={deleteReview}
            updateAction={updateReview}/>
        ))}
      </LoadMore>
      {isAuthenticated && validReviewer && <CommentForm recipe={recipe?.slug} refreshPage={refreshRecipe}/>}
      <LoadMore title="More Like This" id="more-like-this" className="px-10 py-8 bg-light-yellow">
        {similarRecipes.filter(recipe=>recipe.slug!==slug).map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
      </LoadMore>
      <LoadMore title={"More by " + recipe?.user?.username??"Unknown"} sid="more-by-chef" className="px-10 py-8 bg-white-primary">
        {recipesByChef.filter(recipe=>recipe.slug!==slug).map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
      </LoadMore>
    </>
  );
};

export default Recipe;
