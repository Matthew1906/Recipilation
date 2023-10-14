import { useEffect, useState } from "react";
import { EffectCoverflow, Navigation, Pagination} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useScreenSize } from "../../hooks";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

const StepCarousel = ({items})=>{
    const [ current, setCurrent ] = useState(0);
    const [ elements, setElements ] = useState([]);
    const screenSize = useScreenSize(); 
    useEffect(()=>{
      const els = items.sort((a,b)=>a.index-b.index);
      setElements(els);    
    }, [items]);
    return(
        <div className='p-5'>
          <Swiper
            effect={"coverflow"}
            grabCursor
            centeredSlides
            slidesPerView={screenSize===0?1:3}
            coverflowEffect={{
              rotate: 40,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            slidesPerGroupSkip={0}
            pagination
            navigation
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="step w-full text-black"
            onSlideChange={(swiper)=>setCurrent(swiper.realIndex)}
            onAfterInit={()=>{
              setCurrent(0);
            }}
          >
            {elements.map((item)=>(
                <SwiperSlide key={item?.index}>
                    <img src={item?.image??'/images/not-exist.jpg'}  alt={item?.title} className='w-50 aspect-[3/2]'/>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className='my-5 text-center text-nunito'>
          <strong className='text-md sm:text-lg md:text-xl lg:text-3xl font-semibold'>{elements[current]?.index}. {elements[current]?.title}</strong>
          <p className="mt-3 px-8 md:px-24 text-xs sm:text-base md:text-lg lg:text-2xl font-light text-justify">{elements[current]?.details}</p>
        </div>
      </div>
    )
}

export default StepCarousel;