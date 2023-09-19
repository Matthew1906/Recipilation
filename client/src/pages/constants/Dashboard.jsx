import { Link } from "react-router-dom";
import { getCategories } from "../../api/category";
import { getRecentlyViewedRecipes, getRecipes } from "../../api/recipe";
import { RecipeCard } from "../../components/cards";
import { RecipeCarousel } from "../../components/carousels";
import { LoadMore, Pagination } from "../../components/containers";
import { CombinationIcon } from "../../components/icons";
import { useAuth } from "../../hooks";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [ recentlyViewed, setRecentlyViewed ] = useState([]);
  const [ topRecipes, setTopRecipes ] = useState([]);
  const [ topCategories, setTopCategories] = useState([]);
  useEffect(()=>{
    getRecipes().then(res=>setTopRecipes(res.data.sort((a,b)=>
      a.rating===b.rating?b.reviews.length-a.reviews.length:b.rating-a.rating
    )));
    getCategories().then(categories=>setTopCategories(categories.data));
  }, []);
  useEffect(()=>{
    if(isAuthenticated){
      getRecentlyViewedRecipes().then(res=>setRecentlyViewed(res.data));
    }
  }, [isAuthenticated])
  return (
    <>
      {/* Carousel (Top rated/Trending Recipes) */}
      <RecipeCarousel recipes={topRecipes.slice(0, 5)} />
      {/* Top Categories */}
      <section className="px-10 py-8" id="top-categories">
        <h5 className="font-nunito font-bold text-2xl mb-3 md:mb-0">Top Categories</h5>
        <div className="flex justify-center lg:justify-between flex-wrap items-center lg:px-8 mt-4">
          {topCategories.slice(0,4).map((category, key) => (
            <Link to={"/categories/"+category.slug} key={key}>
              <CombinationIcon
                images={category.images.slice(0, 4)} // can only show 4 first images
                name={category.name}
              />
            </Link>
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
        {topRecipes.map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
      </LoadMore>
      {/* Top-rated recipes in (most famous category) */}
      {/* Recently viewed recipes (both) */}
      {isAuthenticated && (recentlyViewed??[]).length>0 &&
        <section className="px-10 py-8 bg-white-secondary" id="recommended">
          <h5 className="font-nunito font-bold text-xl md:text-3xl mb-4 md:mb-0">Recently viewed</h5>
          <Pagination items={recentlyViewed??[]} perPage={4}/>
        </section>
      }
      {/* Top-rated recipes in (recently viewed category if exists) */}
    </>
  );
};

export default Dashboard;
