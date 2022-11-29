import { Link } from "react-router-dom";

const CombinationImages = ({images, name, round, className})=>{
    const borderRadius = [
        (key)=>['rounded-full'][key], // for the sake of consistency 
        (key)=>['rounded-l-full', 'rounded-r-full'][key], 
        (key)=>['rounded-tl-full', 'rounded-tr-full', 'rounded-b-full'][key], 
        (key)=>['rounded-tl-full', 'rounded-tr-full', 'rounded-bl-full', 'rounded-br-full'][key]
    ];
    return (
        <div className={`grid grid-cols-${images.length>1?2:1} ${className}`}>        
            {images.map((image, key)=><img
                src={`${image}`} 
                alt={`${name}-${key}`} 
                key={key} 
                className={`w-full h-full ${images.length===3 && key===images.length-1?'col-span-2':''} ${round?borderRadius[images.length-1](key):""}`}
            />)}
        </div>
    )
}

const CombinationCard = ({to, type, name, images})=>{
    if(type==='icon'){
        return (
            <Link to={to}>
            <div className="flex gap-2 justify-center items-center mx-4 mb-4">
                <CombinationImages images={images} name={name} round={true} className="w-20 h-20"/>
                <h6 className="ml-1 font-fjalla-one font-semibold text-xl md:text-3xl">{name}</h6>
            </div>
            </Link>
        )
    }else if(type==='card'){
        return (
            <Link to={to}>
            <div className="bg-white-primary rounded-md drop-shadow-lg">
                <CombinationImages images={images} name={name}/>
                <div className="text-center">
                    <span>{name} </span>
                </div>
            </div>
            </Link>
        )
    };
};

export default CombinationCard;