import { useState } from "react";
import useScreenSize from "./useScreenSize";

const useModal = () => {
    const screenSize = useScreenSize();
    const [data, setData] = useState([]);
    const toggleData = (input) => data.includes(input)
        ? setData(prev=>prev.filter(value=>value!==input))
        : setData(prev=>Array.from(new Set([...prev, input])))
    ;
    const [isOpen, setIsOpen] = useState(false);
    const openModal = ()=>setIsOpen(true);
    const closeModal = ()=>setIsOpen(false);
    const [status, setStatus] = useState(true);
    const toggleStatus = ()=>setStatus(!status);
    const style = {
        content:{
            width:screenSize>0?"640px":"480px",
            height:"480px",
            margin:"auto"
        }
    };
    return { 
        isOpen, style,    
        data:{
            value:data, 
            toggle:toggleData,
            clear: ()=>setData([])
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