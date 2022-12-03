import { useParams, useNavigate } from "react-router";
import { TiArrowBack } from "react-icons/ti";
import { recipes } from "../data";
import Pagination from "../../components/containers/Pagination";
import { titleString } from "../../components/utils";

const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <>
      <h2 className="px-10 pt-5 font-fjalla-one text-3xl mb-3 md:mb-0 flex">
        <TiArrowBack onClick={goBack} />
        <span>{titleString(category)} Food</span>
      </h2>
      <h4 className="px-10 py-2 font-nunito font-extralight text-2xl">
        Check out all {titleString(category)} recipes!
      </h4>
      <div className="px-10 mb-10">
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
    </>
  );
};

export default Category;
