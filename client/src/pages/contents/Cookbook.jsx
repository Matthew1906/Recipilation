import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteCookbook, getRecipesByCookbook } from "../../api/cookbook";
import { Pagination } from "../../components/containers";
import { BackIcon } from "../../components/icons";
import { titleString } from "../../utils/string";
import { Button } from "../../components/utils";

const Cookbook = () => {
  const { slug } = useParams();
  const [ recipes, setRecipes ] = useState([]);
  useEffect(()=>{
    getRecipesByCookbook(slug).then(res=>{
      setRecipes(res.data);
    })
  }, [slug]);
  const navigate = useNavigate();
  const removeCookbook = ()=>{
    deleteCookbook(slug)
    navigate("/cookbooks");
  }
  return (
    <>
      <h2 className="px-10 pt-5 font-fjalla-one text-3xl mb-3 md:mb-0 flex items-center">
          <BackIcon className="cursor-pointer" />
          <span>"{titleString(slug, "-")}" Cookbook</span>
      </h2>
      <h4 className="px-10 py-2 font-nunito font-extralight text-2xl">
        Check out all recipes from this cookbook!
      </h4>
      <div className="px-10 mb-10">
        <Pagination
          items={recipes}
          perPage={4}
        />
        <div className="mt-6 flex justify-center items-center">
          <Button theme='red' type='button' onClick={removeCookbook}>Delete Cookbook</Button>
        </div>
      </div>
    </>
  );
};

export default Cookbook;