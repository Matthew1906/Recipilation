
const StepCard = ({index, step})=>{
    return (
        <div className="my-4 flex gap-5 bg-white-primary rounded-md drop-shadow-md">
            <img src={step.image} alt={step.title} className="w-2/5 h-full object-fill"/>
            <div className="px-3 py-6">
                <h4 className="font-semibold">{index+1}. {step.title}</h4>
                <p>{step.description}</p>
            </div>
        </div>
    )
};

export default StepCard;