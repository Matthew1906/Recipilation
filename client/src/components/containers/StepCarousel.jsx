import {useState, useEffect} from "react";
import {RxDoubleArrowRight, RxDoubleArrowLeft} from "react-icons/rx";

const CarouselItem = (props)=>{
    return (
        <div className={`inline-flex items-center justify-center ${props.itemSize}`} style={{width:props.width}}>
            {props.src && <img src={props.src} alt={props.alt} className="h-36 w-auto"/>}
        </div>
    );
};

const Carousel = ({width, items, itemSize, onMove})=>{
    // Configure active state
    const [active, setActive] = useState((100-width)/width);
    // Right slide
    const incrementActive = ()=>{
        let newActive = active+(100/width)>=items.length?(100-width)/width:active+1;
        setActive(newActive);
        {onMove?onMove(newActive):console.log(newActive)};
    }
    // Left slide
    const decrementActive = ()=>{
        let newActive = active-(100-width)/width<=0?items.length-(100/width):active-1;
        setActive(newActive);
        {onMove?onMove(newActive):console.log(newActive)};
    }
    // Render JSX
    return (
        <div className="flex justify-center items-center gap-6 px-12">   
            <button onClick={decrementActive} className="text-black">
                <RxDoubleArrowLeft className='w-12 h-auto font-bold'/>
            </button>     
            <div className='overflow-hidden'>
                <div 
                    className='whitespace-nowrap transition-tranform duration-300' 
                    style={{transform:`translateX(-${active*width}%`}}
                >
                    {items.map((value,key)=>{
                        return <CarouselItem 
                            src={value.image} 
                            alt={value.title} 
                            width={`${width}%`} 
                            key={key} 
                            itemSize={itemSize}
                        />
                    })}
                </div>
            </div>
            <button onClick={incrementActive} className="text-black">
                <RxDoubleArrowRight className='w-12 h-auto font-bold'/>
            </button>
        </div>
    );
};

const StepCarousel = ({items})=>{
    const [steps, setSteps] = useState([]);
    useEffect(()=>{
        const prefix = items.slice(0,3);
        const suffix = items.slice(items.length-3, items.length);
        setSteps(suffix.concat(items, prefix));
    }, [items]);
    const [current, setCurrent] = useState(3);
    const moveStep = (curr)=>{
        setCurrent(curr);
    };
    return(
        <>
        {steps.length!==0
            ?<div className="p-5">
                <Carousel 
                    items={steps} 
                    onMove={moveStep} 
                    width={25}
                    itemSize="w-auto h-9 md:h-36 mx-2"
                />
                <div className='flex flex-col items-center gap-4 p-5'>
                    <div className='px-16 col-span-1 text-black text-justify flex flex-col'>
                        <em className="mb-5 text-xl md:text-3xl flex justify-center font-bold tracking-tight">{current-2}. {steps[current].title}</em>
                        <p className="text-base md:text-2xl">{steps[current].description}</p>
                    </div>
                </div>
            </div>
            :""}
        </>
    )
}

export default StepCarousel;