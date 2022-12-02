import { useState } from "react";
import Header from "../../components/partials/Header";
import Footer from "../../components/partials/Footer";
import TextInput from "../../components/forms/TextInput";
import Button from "../../components/utils/Button";
import LoadMore from "../../components/containers/LoadMore";
import CombinationCard from "../../components/cards/CombinationCard";
import RecipeCard from "../../components/cards/RecipeCard";
import ProfileCard from "../../components/cards/ProfileCard";
import { categories, profiles, recipes } from "../data";

const Search = () => {
  const [query, setQuery] = useState("");
  const changeQuery = (e) => setQuery(e.target.value);
  const submitQuery = (e) => {
    e.preventDefault();
    console.log(query);
  };
  return (
    <div className="w-full min-h-screen h-auto flex flex-col justify-between">
      <Header auth="guest" />
      <main className="grow overflow-x-hidden">
        <form onSubmit={submitQuery} className="flex p-5">
          <TextInput
            placeholder="Search recipes, categories, or users"
            type="text"
            changeInput={changeQuery}
            inputValue={query}
            className="rounded-r-none"
          />
          <Button className="rounded-l-none" theme="red" expand={false}>
            Search
          </Button>
        </form>
        <h3 className="px-5 font-fjalla-one text-2xl">
          {query.trim() === ""
            ? "Top rated recipes"
            : `Search results for "${query}"`}
        </h3>
        {/* Recipe results */}
        <LoadMore
          to={"/"}
          title="Recipes"
          id="search-recipe"
          className="pt-5 px-10"
        >
          {recipes.slice(0, 2).map((recipe, key) => (
            <RecipeCard recipe={recipe} key={key} />
          ))}
        </LoadMore>
        {/* Category results */}
        <LoadMore
          to={"/"}
          title="Categories"
          id="search-category"
          className="pt-5 px-10"
        >
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
        <LoadMore
          to="/"
          title="Users"
          id="search-user"
          className="py-5 px-10"
          cols={3}
        >
          {profiles.slice(1, 4).map((profile, key) => (
            <ProfileCard
              key={key}
              image={profile.image}
              name={profile.name}
              recipes={profile.recipes}
              rating={profile.rating}
              reviews={profile.reviews}
            />
          ))}
        </LoadMore>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
