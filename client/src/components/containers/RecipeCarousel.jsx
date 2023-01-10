import { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Button } from "../utils";
import { limitString } from "../../utils/string";

const RecipeCarouselCard = ({ title, description }) => {
  return (
    <div className="w-60 max-h-80 md:h-auto md:w-auto md:max-w-md lg:max-w-4xl bg-white py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8 flex flex-col flex-wrap gap-2 lg:gap-5">
      <h3 className="font-fjalla-one font-medium text-xl md:text-3xl lg:text-5xl">{title}</h3>
      <p className="font-nunito md:text-xl lg:text-2xl">{description}</p>
      <Link to="/">
        <Button theme="orange" className='text-xs' expand={true}>Learn More</Button>
      </Link>
    </div>
  );
};

const RecipeCarousel = ({ recipes }) => {
  const [current, setCurrent] = useState(0);
  const [move, setMove] = useState(null);
  const prevRecipe = () => {
    setMove("left");
    setCurrent(current === 0 ? recipes.length - 1 : current - 1);
    setTimeout(() => setMove("middle"), 100);
  };
  const nextRecipe = () => {
    setMove("right");
    setCurrent(current + 1 === recipes.length ? 0 : current + 1);
    setTimeout(() => setMove("middle"), 100);
  };
  return (
    <div
      style={{
        backgroundImage: `url('${recipes[current].image}')`,
        transform:
          move === "left"
            ? "translateX(-10%)"
            : move === "right"
            ? "translateX(10%)"
            : "none",
      }}
      className={`basis-full lg:min-h-screen h-96 lg:h-full flex justify-between items-center bg-cover px-5 py-20 lg:py-0 transition-transform ease-in-out duration-500`}
    >
      <button onClick={prevRecipe}>
        <BsFillArrowLeftCircleFill className="w-8 md:w-16 h-auto opacity-50" />
      </button>
      <RecipeCarouselCard
        title={recipes[current].title}
        description={limitString(recipes[current].description, 100)}
      />
      <button onClick={nextRecipe}>
        <BsFillArrowRightCircleFill className="w-8 md:w-16 h-auto opacity-50" />
      </button>
    </div>
  );
};

export default RecipeCarousel;
