import { useState } from "react";
import { CombinationCard, ProfileCard, RecipeCard } from "../../components/cards";
import { LoadMore } from "../../components/containers";
import { SearchForm } from "../../components/forms";
import { categories, profiles, recipes } from "../../utils/data";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchQuery = (res) => setQuery(res.query);
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
        {recipes.slice(0, 2).map((recipe, key) => (
          <RecipeCard recipe={recipe} key={key} />
        ))}
      </LoadMore>
      {/* Category results */}
      <LoadMore title="Categories" id="search-category" className="pt-5 px-10">
        {categories.slice(2, 4).map((category, key) => (
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
      <LoadMore title="Users" id="search-user" className="py-5 px-10" cols={3}>
        {profiles.slice(1, 4).map((profile, key) => (
          <ProfileCard key={key} profile={profile}/>
        ))}
      </LoadMore>
    </>
  );
};

export default Search;
