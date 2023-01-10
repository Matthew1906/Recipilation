import { useParams, useNavigate } from "react-router";
import { FaEdit, FaShareAlt, FaTrashAlt } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { recipes } from "../../utils/data";
import { Pagination } from "../../components/containers";
import { titleString } from "../../utils/string";

const Cookbook = () => {
  const { cookbook } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <>
      <h2 className="px-10 pt-5 font-fjalla-one text-3xl mb-3 md:mb-0 flex items-center">
        <TiArrowBack onClick={goBack} />
        <span>{titleString(cookbook)}</span>
        <FaTrashAlt className="ml-2 text-red cursor-pointer link-expand text-lg" />
        <FaEdit className="ml-1 cursor-pointer link-expand text-lg" />
        <FaShareAlt className="cursor-pointer link-expand text-lg" />
      </h2>
      <h4 className="px-10 py-2 font-nunito font-extralight text-2xl">
        Check out your collection of{" "}
        <span className="font-bold">{titleString(cookbook)}</span>!
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

export default Cookbook;