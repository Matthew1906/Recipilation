import { useState } from "react";

const useModal = () => {
    const [data, setData] = useState([]);
    const toggleData = (input)=>{
        if(data.includes(input)){
            setData(prev=>prev.filter((value)=>{
                return value!==input;
            }));
        }
        else{
            setData(prev=>[...prev, input]);
        }
    }
    const [isOpen, setIsOpen] = useState(false);
    const openModal = ()=>setIsOpen(true);
    const closeModal = ()=>setIsOpen(false);
    const style = {
        content:{
            width:"640px",
            height:"480px",
            margin:"auto"
        }
    };
    return { isOpen, openModal, closeModal, style, data, toggleData };
};

export default useModal;