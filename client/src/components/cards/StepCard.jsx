import PropTypes from "prop-types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const StepCard = ({index, step, onUpdate, onDelete})=>{
    const updateItem = ()=>onUpdate(index);
    const deleteItem = ()=>onDelete(index);
    return (
        <div className="my-4 flex gap-5 bg-white-primary rounded-md drop-shadow-md">
            <div className="flex">
                <img src={step.image??'/images/not-exist.jpg'} alt={step.title} className="w-full h-full aspect-[3/2]"/>
            </div>
            <div className="px-3 py-6 text-xs md:text-base">
                <h4 className="font-semibold">{index+1}. {step.title}</h4>
                <p>{step.details}</p>
                <div className="mr-3 flex justify-end gap-2 font-bold">
                    <FaTrashAlt className="text-red text-lg md:text-2xl cursor-pointer link-expand" onClick={deleteItem}/>
                    <FaEdit className="text-lg md:text-2xl cursor-pointer link-expand" onClick={updateItem}/>
                </div>
            </div>
        </div>
    )
};

StepCard.propTypes = {
    index: PropTypes.number,
    step: PropTypes.object,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
}

export default StepCard;