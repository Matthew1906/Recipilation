import { Link } from "react-router-dom";
import { RecipeCard } from "../../components/cards";
import { LoadMore, Pagination, RecipeCarousel } from "../../components/containers";
import { CombinationIcon } from "../../components/icons";
import { categories, recipes } from "../../utils/data";

const Dashboard = () => {
  return (
    <>
      {/* Carousel (Top rated/Trending Recipes) */}
      <RecipeCarousel recipes={recipes} />
      {/* Top Categories */}
      <section className="px-10 py-8" id="top-categories">
        <h5 className="font-nunito font-bold text-2xl mb-3 md:mb-0">Top Categories</h5>
        <div className="flex justify-center lg:justify-between flex-wrap items-center px-8 mt-4">
          {categories.map((category, key) => (
            <CombinationIcon
              key={key}
              images={category.images.slice(0, 4)} // can only show 4 first images
              name={category.name}
              to="/categories/italian"
            />
          ))}
          <Link to="/categories">
            <span className="text-blue text-xl font-nunito underline hover:text-red">
              View more
            </span>
          </Link>
        </div>
      </section>
      {/* Recipes - Recommended for you (User) */}
      <LoadMore title="Recommended for you" id="recommended" className="px-10 py-8 bg-light-yellow">
        {recipes.map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
      </LoadMore>
      {/* Top-rated recipes in (most famous category) */}
      {/* Recently viewed recipes (both) */}
      <section className="px-10 py-8 bg-white-secondary" id="recommended">
        <h5 className="font-nunito font-bold text-2xl mb-4 md:mb-0">Recently viewed</h5>
        <Pagination items={[...recipes, ...recipes.reverse(), ...recipes.slice(0, 2)]} perPage={4}/>
      </section>
      {/* Top-rated recipes in (recently viewed category if exists) */}
    </>
  );
};

export default Dashboard;
