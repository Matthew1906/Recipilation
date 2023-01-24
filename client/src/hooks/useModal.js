import { useState } from "react";

const useModal = () => {
    const [data, setData] = useState([]);
    const toggleData = (input) => data.includes(input)
        ? setData(prev=>prev.filter(value=>value!==input))
        : setData(prev=>[...prev, input])
    ;
    const [isOpen, setIsOpen] = useState(false);
    const openModal = ()=>setIsOpen(true);
    const closeModal = ()=>setIsOpen(false);
    const [status, setStatus] = useState(true);
    const toggleStatus = ()=>setStatus(!status);
    const style = {
        content:{
            width:"640px",
            height:"480px",
            margin:"auto"
        }
    };
    return { 
        isOpen, style,    
        data:{
            value:data, 
            toggle:toggleData
        }, 
        modal:{
            open:openModal, 
            close:closeModal
        }, 
        status:{
            value:status, 
            toggle:toggleStatus
        }
    };
};

export default useModal;