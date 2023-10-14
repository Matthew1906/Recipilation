import { useState, useEffect } from "react";
import { searchCategories } from "../../api/category";
import { searchRecipes } from "../../api/recipe";
import { searchUsers } from "../../api/user";
import { CombinationCard, ProfileCard, RecipeCard } from "../../components/cards";
import { LoadMore } from "../../components/containers";
import { SearchForm } from "../../components/forms";

const Search = () => {
  const [ query, setQuery ] = useState("");
  const [ recipes, setRecipes ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ profiles, setProfiles ] = useState([]);
  const searchQuery = (res) => setQuery(res.query);
  useEffect(()=>{
    searchCategories(query).then(res=>setCategories(res.data));
    searchRecipes(query).then(res=>setRecipes(res.data));
    searchUsers(query).then(res=>setProfiles(res.data));
  }, [query])
  return (
    <>
      <SearchForm onSubmit={searchQuery}/>
      <h3 className="px-5 font-fjalla-one text-2xl">
        {query.trim() === ""
          ? "Top rated recipes"
          : `Search results for "${query}"`}
      </h3>
      {/* Recipe results */}
      <LoadMore title="Recipes" id="search-recipe" className="pt-5 px-10">
        {recipes.map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
      </LoadMore>
      {/* Category results */}
      <LoadMore title="Categories" id="search-category" className="pt-5 px-10">
        {categories.map((category, key) => (
          <CombinationCard
            key={key}
            images={category.images.slice(0, 4)} // can only show 4 first images
            name={category.name}
            to="/"
            recipes={12}
          />
        ))}
      </LoadMore>
      {/* User results */}
      <LoadMore title="Users" id="search-user" className="py-5 px-10" cols={3} items={3}>
        {profiles.map((profile, key) => (
          <ProfileCard key={key} profile={profile}/>
        ))}
      </LoadMore>
    </>
  );
};

export default Search;
