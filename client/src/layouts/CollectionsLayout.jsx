import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import LoadMore from "../components/containers/LoadMore";
import CombinationCard from "../components/cards/CombinationCard";

const CollectionsLayout = ({auth, cookbook, heading, subheading, items}) =>{
    return (
        <div className="w-full min-h-screen h-auto flex flex-col justify-between">
          <Header auth={auth?auth:'guest'} />
          <main className="grow overflow-x-hidden">
              <h2 className="pt-5 px-10 font-fjalla-one text-3xl mb-3 md:mb-0">{heading}</h2>
              <h4 className="pt-2 px-10 font-nunito font-extralight text-2xl">{subheading}</h4>
              <LoadMore id='categories' className='my-5 px-10' cols={3}>
                {items.map((item, key)=>(
                  <CombinationCard
                    key={key}
                    name={item.name}
                    images={item.images}
                    recipes={10}
                    cookbook={cookbook}
                  />
                ))}
              </LoadMore>
          </main>
          <Footer />
        </div>
      );
}

export default CollectionsLayout;