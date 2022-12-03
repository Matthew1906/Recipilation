import LoadMore from "../components/containers/LoadMore";
import CombinationCard from "../components/cards/CombinationCard";

const CollectionsLayout = ({ cookbook, heading, subheading, items }) => {
  return (
    <>
      <h2 className="pt-5 px-10 font-fjalla-one text-3xl mb-3 md:mb-0">
        {heading}
      </h2>
      <h4 className="pt-2 px-10 font-nunito font-extralight text-2xl">
        {subheading}
      </h4>
      <LoadMore id="categories" className="my-5 px-10" cols={3}>
        {items.map((item, key) => (
          <CombinationCard
            key={key}
            name={item.name}
            images={item.images}
            recipes={10}
            cookbook={cookbook}
          />
        ))}
      </LoadMore>
    </>
  );
};

export default CollectionsLayout;
