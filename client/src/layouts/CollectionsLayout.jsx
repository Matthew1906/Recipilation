import PropTypes from "prop-types";
import { CombinationCard } from "../components/cards";
import { LoadMore } from "../components/containers";
import { NewCookbookModal } from "../components/modals";

const CollectionsLayout = ({ cookbook, heading, subheading, items }) => {
  return (
    <>
      <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:pr-12">
        <div className="mt-10 mx-10 sm:mt-0 sm:mx-0">
          <h2 className="sm:pt-5 sm:px-10 font-fjalla-one text-xl md:text-2xl lg:text-3xl mb-3 md:mb-0">
            {heading}
          </h2>
          <h4 className="sm:pt-2 sm:px-10 font-nunito font-extralight text-lg md:text-xl lg:text-2xl">
            {subheading}
          </h4>
        </div>
        <div className="mt-2 mx-10 sm:mt-0 sm:mx-0">
        {cookbook && <NewCookbookModal/>}
        </div>
        
      </div>
      
      <LoadMore id="collections" className="my-5 px-10" cols={3} items={6}>
        {items.length>0 && items.map((item, key) => (
          <CombinationCard
            key={key}
            name={item.name}
            images={item.images}
            recipes={item.numRecipes}
            cookbook={cookbook}
          />
        ))}
      </LoadMore>
    </>
  );
};

CollectionsLayout.propTypes = {
  cookbook: PropTypes.bool, 
  heading: PropTypes.string, 
  subheading: PropTypes.string, 
  items: PropTypes.arrayOf(PropTypes.object)
}

export default CollectionsLayout;
