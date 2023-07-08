import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination} from 'swiper';
import "./styles.css";

/* TO DEBUG:
- In the initial render, the order of the slide images starts from slide 3, while the current index is 0
- setting the initialSlide did not work at all
- However when the user starts navigating the slides, it goes back to normal
- When inspecting the elements, it seems that the order of the slides starts from 3 to the end, and then back to 1

*/
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
            initialSlide={-1}
          >
            {items.sort((a,b)=>a.index-b.index).map((item)=>(
                <SwiperSlide key={item?.index}>
                    <img src={item?.image??'/images/not-exist.jpg'}  alt={item?.title} className='w-50 aspect-[3/2]'/>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className='my-5 text-center text-nunito'>
          <strong className='text-xl md:text-3xl font-semibold'>{items[current]?.index}. {items[current]?.title}</strong>
          <p className="mt-3 px-24 text-lg md:text-2xl font-light text-justify">{items[current]?.details}</p>
        </div>
      </div>
    )
}

export default StepCarousel;