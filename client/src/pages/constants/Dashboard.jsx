import { Link } from "react-router-dom";
import { getCategories } from "../../api/category";
import { getRecentlyViewedRecipes, getRecipes, getRecommendedRecipes } from "../../api/recipe";
import { RecipeCard } from "../../components/cards";
import { RecipeCarousel } from "../../components/carousels";
import { LoadMore, Pagination } from "../../components/containers";
import { CombinationIcon } from "../../components/icons";
import { useAuth } from "../../hooks";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [ recentlyViewed, setRecentlyViewed ] = useState([]);
  const [ recommendedRecipes , setRecommendedRecipes ] = useState([]);
  const [ topRecipes, setTopRecipes ] = useState([]);
  const [ topCategories, setTopCategories] = useState([]);
  useEffect(()=>{
    getRecipes().then(res=>setTopRecipes(res.data.sort((a,b)=>
      a.rating===b.rating?b.reviews.length-a.reviews.length:b.rating-a.rating
    )));
    getCategories().then(categories=>setTopCategories(categories.data.sort((a,b)=>
      a.avgRating-b.avgRating||b.numRecipes-a.numRecipes))
    );
    const history = sessionStorage.getItem("history");
    getRecentlyViewedRecipes(history!==null?history:"").then(res=>setRecentlyViewed(res.data));
  }, []);
  useEffect(()=>{
    if(isAuthenticated){
      getRecommendedRecipes().then(res=>setRecommendedRecipes(res.data.sort((a,b)=>
        a.rating===b.rating?b.reviews.length-a.reviews.length:b.rating-a.rating
      )));
    }
  }, [isAuthenticated])
  return (
    <>
      {/* Carousel (Top rated/Trending Recipes) */}
      <RecipeCarousel recipes={topRecipes.slice(0, 5)} />
      {/* Top Categories */}
      <section className="px-10 py-8" id="top-categories">
        <h5 className="font-nunito font-bold text-xl md:text-2xl mb-3 md:mb-0">Top Categories</h5>
        <div className="grid grid-cols-2 md:flex md:justify-center lg:justify-between md:flex-wrap md:items-center lg:px-8 mt-4">
          {topCategories.slice(0,4).map((category, key) => (
            <Link to={"/categories/"+category.slug} key={key}>
              <CombinationIcon
                images={category.images.slice(0, 4)} // can only show 4 first images
                name={category.name}
              />
            </Link>
          ))}
          <Link to="/categories">
            <span className="text-blue text-lg md:text-xl font-nunito underline hover:text-red">
              View more
            </span>
          </Link>
        </div>
      </section>
      {/* Recipes - Recommended for you
        * For logged in users: show recipes based on the user's review (take recipes with similar categories and users)
        * For guest users: show recipes based on their overall rating
      */}
      {isAuthenticated && (recommendedRecipes??[]).length>0
        ? <LoadMore title="Recommended for you" id="recommended" className="px-10 py-8 bg-light-yellow">
          {recommendedRecipes.map((recipe, key) => (
            <RecipeCard recipe={recipe} key={key} />
          ))}
        </LoadMore>
        : <LoadMore title="Top recipes" id="recommended" className="px-10 py-8 bg-light-yellow">
        {topRecipes.map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
        </LoadMore>
      }
      {/* Recently viewed recipes (both) */}
      {(recentlyViewed??[]).length>0 &&
        <section className="px-10 py-8 bg-white-secondary" id="recommended">
          <h5 className="font-nunito font-bold text-xl md:text-2xl mb-4 md:mb-0">Recently viewed</h5>
          <Pagination items={recentlyViewed.reverse()??[]} perPage={4}/>
        </section>
      }
    </>
  );
};

export default Dashboard;
