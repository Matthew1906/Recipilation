import { LoadMore } from "../components/containers";
import { CombinationCard } from "../components/cards";
import { NewCookbookModal } from "../components/modals";

const CollectionsLayout = ({ cookbook, heading, subheading, items }) => {
  return (
    <>
      <div className="flex justify-between items-center pr-12">
        <div>
          <h2 className="pt-5 px-10 font-fjalla-one text-3xl mb-3 md:mb-0">
            {heading}
          </h2>
          <h4 className="pt-2 px-10 font-nunito font-extralight text-2xl">
            {subheading}
          </h4>
        </div>
        {cookbook && <NewCookbookModal/>}
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

export default CollectionsLayout;
