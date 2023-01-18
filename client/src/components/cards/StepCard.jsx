import { FaEdit, FaTrashAlt } from "react-icons/fa";

const StepCard = ({index, step})=>{
    return (
        <div className="my-4 flex gap-5 bg-white-primary rounded-md drop-shadow-md">
            <div className="flex">
                <img src={step.image} alt={step.title} className="w-full h-full"/>
            </div>
            <div className="px-3 py-6">
                <h4 className="font-semibold">{index+1}. {step.title}</h4>
                <p>{step.description}</p>
                <div className="mr-3 flex justify-end gap-2 font-bold">
                    <FaTrashAlt className="text-red text-2xl cursor-pointer link-expand"/>
                    <FaEdit className="text-2xl cursor-pointer link-expand" />
                </div>
            </div>
        </div>
    )
};

export default StepCard;