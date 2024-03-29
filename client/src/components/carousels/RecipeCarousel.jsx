import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../utils";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

const RecipeCarouselCard = ({ name, description, image, to }) => {
  return (
    <div
      className="basis-full lg:min-h-screen h-96 lg:h-full flex justify-center items-center rounded-lg bg-cover px-5 py-20 lg:py-0" 
      style={{backgroundImage:`url('${image}')`}}
    >
      <div className="w-60 max-h-80 md:h-auto md:w-auto md:max-w-md lg:max-w-4xl bg-white py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8 flex flex-col gap-2 lg:gap-5">
        <h3 className="font-fjalla-one font-medium text-xl md:text-3xl lg:text-5xl">{name}</h3>
        <p className="font-nunito text-sm md:text-xl lg:text-2xl">{description}</p>
        <Link to={'/recipes/'+to}>
          <Button theme="orange" className='text-xs' expand>Learn More</Button>
        </Link>
      </div>
    </div>
  );
};

RecipeCarouselCard.propTypes = {
  name: PropTypes.string, 
  description: PropTypes.string, 
  image: PropTypes.string, 
  to: PropTypes.string
}

const RecipeCarousel = ({ recipes }) => {
  return (
    <Swiper 
      loop 
      navigation 
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Navigation, Pagination]}
      className="recipe"
    >
      {recipes.map((recipe, key)=>(
        <SwiperSlide key={key}>
          <RecipeCarouselCard name={recipe.name} description={recipe.description} image={recipe.image} to={recipe.slug}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

RecipeCarousel.propTypes = {
  name: PropTypes.string, 
  image: PropTypes.string, 
  description: PropTypes.string, 
  to: PropTypes.string
}

export default RecipeCarousel;
