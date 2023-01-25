import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination} from 'swiper';
import "./styles.css";

const StepCarousel = ({items})=>{
    const [current, setCurrent] = useState(0);
    return(
        <div className='p-5'>
          <Swiper
            effect={"coverflow"}
            grabCursor
            centeredSlides
            slidesPerView={3}
            coverflowEffect={{
              rotate: 40,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            loop
            slidesPerGroupSkip={3}
            pagination
            navigation
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="step w-full text-black"
            onSlideChange={(swiper)=>setCurrent(swiper.realIndex)}
          >
            {items.map((item, key)=>(
                <SwiperSlide key={key}>
                    <img src={item.image}  alt={item.title} className='w-50'/>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className='my-5 text-center text-nunito'>
          <strong className='text-xl md:text-3xl font-semibold'>{current+1}. {items[current].title}</strong>
          <p className="mt-3 px-24 text-lg md:text-2xl font-light text-justify">{items[current].description}</p>
        </div>
      </div>
    )
}

export default StepCarousel;