import { Link } from "react-router-dom";
import Header from "../../components/partials/Header";
import Footer from "../../components/partials/Footer";
import Pagination from "../../components/containers/Pagination";
import Button from "../../components/utils/Button";
import { recipes } from "../data";

const MyRecipes = () => {
  return (
    <div className="w-full min-h-screen h-auto flex flex-col justify-between">
      <Header auth="user" />
      <main className="grow overflow-x-hidden">
        <div className='pt-5 px-10 flex justify-between items-center'>
        <div>
          <h2 className="pt-5 font-fjalla-one text-3xl mb-3 md:mb-0">
            My Recipes
          </h2>
          <h4 className="py-2 font-nunito font-extralight text-2xl">
            Check out my recipes!
          </h4>
        </div>
        <Link to="/"><Button theme='yellow'>New Recipe</Button></Link>
        </div>
        <div className='px-10 mb-10'>
        <Pagination
          items={[
            ...recipes,
            ...recipes.reverse(),
            ...recipes.reverse(),
            ...recipes.reverse(),
          ]}
          perPage={4}
        />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyRecipes;
